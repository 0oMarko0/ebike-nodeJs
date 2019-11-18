import GeoPoint, { GeoPointModel } from "../model/geo-point";
import JourneyRepo from "../data/repository/journey-repo";
import StatisticsRepo from "../data/repository/statistics-repo";
import BikePathRepo from "../data/repository/bike-path";
const PathFinder = require("geojson-path-finder");
import * as turf from '@turf/turf'

export default class JourneyController {
    private journeyRepo: JourneyRepo;
    private statisticsRepo: StatisticsRepo;
    private bikePathRepo: BikePathRepo;
    constructor(journeyRepo: JourneyRepo, statisticsRepo: StatisticsRepo, bikePathRepo: BikePathRepo) {
        this.journeyRepo = journeyRepo;
        this.statisticsRepo = statisticsRepo;
        this.bikePathRepo = bikePathRepo;
    }

    startingPoint(): GeoPointModel {
        return new GeoPoint(46.77656, -71.2718).toModel;
    }

    // Algo
    // 1. Build the local network
    //      1.1 validate that there restaurant type in that area ? -> or validate later ?
    // 2. find the nearest position the is a bike line
    // 3. find all finish position
    // 4. build all possible path -> may be quite expressive to do
    //      4.1 chose all those that respect the condition
    // 5. filter those that have the requirement

    async createAJourney(body: any) {
        const { latitude, longitude } = body.startingPoint.coordinates;
        const point = new GeoPoint(latitude, longitude);
        const maxDistance = body.maximumLength * 1.1;
        const minDistance = body.maximumLength * 0.9;

        const bikeLine = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, 0);
        const start = await this.journeyRepo.findBikePathNearAPoint(point, 250, 0);
        const result = await this.journeyRepo.findBikePathNearAPoint(point, maxDistance, minDistance);

        const startPoint = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: start[0].geometry.coordinates[0][0],
            },
            properties: {
                "marker-color": "#6ad15a",
                "marker-size": "medium",
                "marker-symbol": "",
                "name": "Dinagat Islands",
                "destination": "start"
            }
        };

        const endPoint = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: result[0].geometry.coordinates[0][0]
            },
            properties: {
                "marker-color": "#d16688",
                "marker-size": "medium",
                "marker-symbol": "",
                "name": "Dinagat Islands",
                "destination": "start"
            }
        };

        const featureCollectionForNetwork = this.buildFeature(bikeLine);
        const network = new PathFinder(featureCollectionForNetwork);
        const path = network.findPath(startPoint, endPoint);

        const distance: number = this.calculateDistance(path.path);
        const featurePath: any = this.buildFeatureA(path, distance);
        featurePath.features.push(startPoint);
        featurePath.features.push(endPoint);

        return featurePath;
    }

    private calculateDistance(coordinates: number[][]) {
        let total = 0;
        for(let i = 1; i < coordinates.length; i++) {
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
                distance
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
                properties: { id: item.id },
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
