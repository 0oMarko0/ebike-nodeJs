import JourneyRepo from "../data/repository/journey-repo";
import StatisticsRepo from "../data/repository/statistics-repo";
import BikePathRepo from "../data/repository/bike-path";
const PathFinder = require("geojson-path-finder");
import * as turf from "@turf/turf";
import logger from "../utils/logger";
import Point, { PointGeometry } from "../model/geometry/point";
import Feature from "../model/feature";
import { FeatureCollection, FeatureCollectionModel } from "../model/feature-collection";
import LineString, { LineStringGeometry } from "../model/geometry/line-string";

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    private statisticsRepo: StatisticsRepo;
    private bikePathRepo: BikePathRepo;
    constructor(journeyRepo: JourneyRepo, statisticsRepo: StatisticsRepo, bikePathRepo: BikePathRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
        this.bikePathRepo = bikePathRepo;
    }

    startingPoint(): PointGeometry {
        return new Point(46.77656, -71.2718).toGeometry;
    }

    // Algo
    // Validate that the restaurant type if valid if the section
    // 1. Build the local network
    //      1.1 validate that there restaurant type in that area ? -> or validate later ?
    // 2. find the nearest position the is a bike line
    // 3. find all finish position
    // 4. build all possible path -> may be quite expressive to do
    //      4.1 chose all those that respect the condition
    // 5. filter those that have the requirement

    async createAJourney(body: any) {
        const { latitude, longitude } = body.startingPoint.coordinates;
        const point = new Point(latitude, longitude);
        const maxDistance = body.maximumLength * 1.1;
        const minDistance = body.maximumLength * 0.9;

        const bikeLine = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, 0);
        const start = await this.journeyRepo.findBikePathNearAPoint(point, 250, 0);
        const result = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, minDistance);

        const startPoint = new Feature<PointGeometry>(
            new Point(start[0].geometry.coordinates[0][0][1], start[0].geometry.coordinates[0][0][0]).toGeometry,
            { "marker-color": "#d100aa" },
        );

        const endPoint = new Feature<PointGeometry>(
            new Point(result[0].geometry.coordinates[0][0][1], result[0].geometry.coordinates[0][0][0]).toGeometry,
            { "marker-color": "#6ad15a" },
        );

        const featureNetwork = new FeatureCollection();
        featureNetwork.addFromList(bikeLine, (item: any) => {
            return new Feature<LineStringGeometry>(new LineString(item.geometry.coordinates[0]).toGeometry, {
                id: item.id,
                hasRestaurants: item.hasRestaurants,
                restaurants: item.hasRestaurants ? item.restaurants : [],
            }).toModel;
        });

        const network = new PathFinder(featureNetwork.toModel, {
            edgeDataReduceFn: (a: any, p: any) => {
                a.push({ id: p.id, restaurants: p.restaurants });
                return a;
            },
            edgeDataSeed: [],
        });
        const path = network.findPath(startPoint.toModel, endPoint.toModel);

        path.edgeDatas[0].reducedEdge.forEach((item: any) => {
            if (item.restaurants && item.restaurants.length > 0) {
                logger.info("Has restaurants");
            }
        });
        const distance: number = this.calculateDistance(path.path);
        const featurePath: any = this.buildFeatureA(path, distance);
        featurePath.features.push(startPoint.toModel);
        featurePath.features.push(endPoint.toModel);

        return featurePath;
    }

    private calculateDistance(coordinates: number[][]) {
        let total = 0;
        for (let i = 1; i < coordinates.length; i++) {
            const startingPoint = coordinates[i - 1];
            const finishingPoint = coordinates[i];
            const from = turf.point(startingPoint);
            const to = turf.point(finishingPoint);
            const distance = turf.distance(from, to);
            total = total + distance;
        }

        return total;
    }

    private buildFeatureA(journey: any, distance: number) {
        let features: any[] = [];
        const featureCollection = {
            type: "FeatureCollection",
            name: "Network",
        };

        const newItem = (coords: any) => ({
            type: "LineString",
            coordinates: coords,
        });

        const test = () => ({
            type: "Feature",
            geometry: newItem(journey.path),
            properties: {
                distance,
            },
        });

        features.push(test());

        Object.assign(featureCollection, {
            features: features,
        });

        return featureCollection;
    }

    private buildFeature(journey: any[]) {
        let features: any[] = [];
        const featureCollection = {
            type: "FeatureCollection",
            name: "Network",
        };

        journey.forEach(item => {
            const newItem = (coords: any) => ({
                type: "LineString",
                coordinates: coords,
            });
            features.push({
                type: "Feature",
                geometry: newItem(item.geometry.coordinates[0]),
                properties: {
                    id: item.id,
                    hasRestaurants: item.hasRestaurants,
                    restaurants: item.hasRestaurants ? item.restaurants : [],
                },
            });
        });

        Object.assign(featureCollection, { features: features });

        return featureCollection;
    }

    async getHeartBeat() {
        const { totalLength } = await this.statisticsRepo.getBikePathLength();
        return {
            nb_restaurants: await this.statisticsRepo.getNumberOfRestaurant(),
            total_path_length: totalLength,
        };
    }

    // TODO: Get from database
    getCitys() {
        return [
            {
                name: "Montreal",
                slug: "montreal",
            },
        ];
    }
}
