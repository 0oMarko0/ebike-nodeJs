import * as turf from "@turf/turf";

import JourneyRepo from "../data/repository/journey-repo";
import StatisticsRepo from "../data/repository/statistics-repo";
import BikePathRepo from "../data/repository/bike-path";
import Point from "../model/geometry/point";
import PathFinding from "../utils/algo/PathFinding";
import RestaurantController from "./restaurant-controller";
import Registry from "../utils/registry";
import { Injectable } from "../utils/injectable";
import { LINE_STRING } from "../model/geometry/line-string";
import { restrainArea } from "../utils/montrealArea";
import logger from "../utils/logger";

const randomPointsOnPolygon = require("random-points-on-polygon");

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    private statisticsRepo: StatisticsRepo;
    private bikePathRepo: BikePathRepo;

    constructor(journeyRepo: JourneyRepo, statisticsRepo: StatisticsRepo, bikePathRepo: BikePathRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
        this.bikePathRepo = bikePathRepo;
    }

    async startingPointForCorrection(body: any) {
        logger.info("startingPointForCorrection");
        const polygon = turf.polygon([restrainArea]);
        let found = false;
        let journey;
        let point: Point;

        while (!found) {
            try {
                const randomPoint: any = randomPointsOnPolygon(1, polygon);
                point = new Point(randomPoint[0].geometry.coordinates[0], randomPoint[0].geometry.coordinates[1]);

                journey = await this.journeyForCorrection({
                    starting_point: point.toGeometry,
                    maximum_length: body.maximum_length,
                    number_of_stops: 1,
                    type: body.type,
                });

                if (journey.length === 0) {
                    this.startingPointForCorrection(body);
                } else {
                    found = true;
                }
            } catch (e) {
                logger.info("Could not find a Journey for that random point, trying a new one");
                this.startingPointForCorrection(body);
            }
        }

        return {
            starting_point: point.toGeometry,
        };
    }

    async createAJourney(body: any) {
        const restaurantController: RestaurantController = Registry.resolve(Injectable.RestaurantController);
        const longitude = body.startingPoint.coordinates[0];
        const latitude = body.startingPoint.coordinates[1];
        const point = new Point(longitude, latitude);
        const distance = body.maximumLength;
        const maxDistance = distance * 1.1;
        const minDistance = distance * 0.9;
        const numberOfStop = body.numberOfStops;
        const type = body.type;

        const bikeLine = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, 0);
        const start = await this.journeyRepo.findBikePathNearAPoint(point, 500, 0);
        const result = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, minDistance);

        const restaurants = await restaurantController.getRestaurant(
            point,
            maxDistance,
            type.length > 0 ? { cuisine: { $in: type } } : null,
        );

        const pathFinding = new PathFinding(start, result, bikeLine, restaurants);

        return pathFinding.findPathWithRestaurant(distance, numberOfStop);
    }

    async getHeartBeat() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nb_restaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            total_path_length: totalLength,
        };
    }

    async journeyForCorrection(body: any) {
        const bodyTranslated = {
            startingPoint: body.starting_point,
            maximumLength: body.maximum_length,
            numberOfStops: body.number_of_stops,
            type: body.type,
        };

        const journey: any = await this.createAJourney(bodyTranslated);

        const segmentList: any = [];
        let segmentId = 0;

        journey.features.forEach((feature: any) => {
            if (feature.geometry.type === LINE_STRING) {
                feature.geometry.coordinates.map((coords: number[]) => {
                    segmentList.push(this.createSegment(segmentId, coords));
                    segmentId++;
                });
            } else {
                const index = Math.floor(Math.random() * segmentList.length);
                const item = segmentList[index];
                Object.assign(item, {
                    restaurant: {
                        name: feature.properties.data.name,
                        type: feature.properties.data.cuisine[0],
                        cote: feature.properties.data.cote,
                    },
                });
                segmentList.splice(index, 1, item);
            }
        });

        return segmentList;
    }

    getCitys() {
        return [
            {
                name: "Montreal",
                slug: "montreal",
            },
        ];
    }

    private createSegment(id: number, coords: number[]) {
        return {
            segment_id: id,
            path: {
                type: LINE_STRING,
                coordinates: [coords[0], coords[1]],
            },
        };
    }
}
