import * as turf from "@turf/turf";
import { Feature, GeometryCollection, Units } from "@turf/helpers";

const PathFinder = require("geojson-path-finder");
import Point, { PointGeometry } from "../../model/geometry/point";
import { Journey, toFeatureCollection } from "../../model/journey";
import _Feature from "../../model/_Feature";
import { FeatureCollection, FeatureCollectionModel } from "../../model/feature-collection";
import LineString, { LINE_STRING, LineStringGeometry } from "../../model/geometry/line-string";
import { Restaurant, toFeaturePoint, toFeaturePoints } from "../../model/restaurant";
import logger from "../logger";
import _ from "lodash";


interface PathResult {
    path: number[][];
    edgeDatas: any[];
}

interface EdgeData {
    id: number;
    restaurants: Restaurant[];
}

export default class PathFinding {
    private readonly startingPointList: _Feature<PointGeometry>[];
    private readonly finishingPointList: _Feature<PointGeometry>[];
    private readonly startingPoint: _Feature<PointGeometry>;
    private readonly finishingPoint: _Feature<PointGeometry>;
    private readonly restaurantsInArea: Restaurant[];
    private network: any;

    get start(): _Feature<PointGeometry> {
        return this.startingPoint;
    }

    constructor(startingArea: Journey[], finishingArea: Journey[], searchArea: Journey[], restaurants: Restaurant[]) {
        this.startingPointList = this.findAllPoint(startingArea, "#5fd173");
        this.finishingPointList = this.findAllPoint(finishingArea);
        this.startingPoint = this.calculatePoint(startingArea, "#6ad15a");
        this.finishingPoint = this.calculatePoint(finishingArea, "#a065d1");
        this.restaurantsInArea = restaurants;

        this.createNetwork(searchArea);
    }

    public findPath(start: _Feature<PointGeometry>, end: _Feature<PointGeometry>) {
        return this.network.findPath(start, end);
    }

    // public findPathToRestaurant(maxDistance: number, numberOfStop: number, type: string[]) {
    //     if (numberOfStop < 0) throw Error("The number of stop must be grater than 0");
    //
    //     const featureCollection = new FeatureCollection();
    //     let found = false;
    //     let i = 0;
    //
    //     while (i < this.restaurantsInArea.length) {
    //         const finishPoint = toFeaturePoint(this.restaurantsInArea[i]);
    //         let path;
    //
    //         try {
    //             path = this.findPath(this.startingPoint, finishPoint);
    //             featureCollection.add(this.pathResultToFeature(path).toModel);
    //             found = true;
    //         } catch (e) {
    //             logger.warn("Unable to find path");
    //         }
    //
    //         i++;
    //     }
    //
    //     return featureCollection;
    // }

    private sortRestaurants(path: PathResult): Restaurant[] {
        const line = turf.lineString(path.path);

        const restaurantByDistance: Restaurant[] =  [];

        this.restaurantsInArea.forEach((restaurant: Restaurant) => {
            const point = turf.point(restaurant.geometry.coordinates);
            const calculatedDistance = turf.pointToLineDistance(point, line);

            restaurantByDistance.push(Object.assign(restaurant, {distance: calculatedDistance}));

        });

        return  _.sortBy(restaurantByDistance, "distance");
    }


    public findPathWithRestaurant(maxDistance: number, numberOfStop: number) {
        if (numberOfStop < 0) throw Error("The number of stop must be grater than 0");
        const featureCollection = new FeatureCollection();
        let path;

        for (let i = 0; i < this.finishingPointList.length; i++) {
            try {
                path = this.findPath(this.startingPoint, this.finishingPointList[i]);
                // @ts-ignore
                const feature: Feature<LineString> = this.pathResultToFeature(path);
                const distance = turf.length(feature) * 1000;

                if ((maxDistance * 1.10) > distance && distance > (maxDistance * .90)) {
                    logger.info(`Path found with length: ${distance}`);
                    featureCollection.add(this.pathResultToFeature(path).toModel);
                    featureCollection.addFromList(toFeaturePoints(this.sortRestaurants(path).slice(0, numberOfStop)));
                    break;
                } else {
                    throw new Error("The path found isn't the right length");
                }
            } catch (e) {
               logger.warn(`Unable To Find Path - Trying another finish point: ${e.message}`);
            }
        }

        return featureCollection;

    }

    // public findPathWithRestaurant(maxDistance: number, numberOfStop: number, type: string[]) {
    //     if (numberOfStop < 0) throw Error("The number of stop must be grater than 0");
    //
    //     const featureCollection = new FeatureCollection();
    //     let found = false;
    //     let i = 0;
    //
    //     while (!found) {
    //         const path = this.findPath(this.startingPoint, this.finishingPointList[i]);
    //         const restaurantList = this.restaurantList(path, type);
    //
    //         if (restaurantList.length >= numberOfStop) {
    //             featureCollection.add(this.pathResultToFeature(path).toModel);
    //             featureCollection.addFromList(toFeaturePoints(restaurantList.slice(0, numberOfStop)));
    //
    //             found = true;
    //         } else {
    //             throw new Error("The path does not contain the number of stop requested");
    //         }
    //
    //         if (i < restaurantList.length) {
    //             i++;
    //         } else {
    //             break;
    //         }
    //     }
    //
    //     featureCollection.addFromList(toFeaturePoints(this.restaurantsInArea));
    //     return featureCollection;
    // }

    private calculatePoint(area: Journey[], color?: string): _Feature<PointGeometry> {
        return new _Feature<PointGeometry>(
            new Point(area[0].geometry.coordinates[0][0][0], area[0].geometry.coordinates[0][0][1]).toGeometry,
            { "marker-color": color ? color : "#6ad15a" },
        );
    }

    private createNetwork(searchArea: Journey[]) {
        this.network = new PathFinder(toFeatureCollection(searchArea), {
            edgeDataReduceFn: (a: any, p: any) => this.dataReduce(a, p),
            edgeDataSeed: [],
        });
    }

    private dataReduce(data: any[], item: any) {
        if (item.hasRestaurants) {
            data.push({ id: item.id, restaurants: item.restaurants });
        }
        return data;
    }

    private findAllPoint(journey: Journey[], color?: string): _Feature<PointGeometry>[] {
        const points: _Feature<PointGeometry>[] = [];

        journey.forEach((item: Journey) => {
            points.push(
                new _Feature<PointGeometry>(
                    new Point(item.geometry.coordinates[0][0][0], item.geometry.coordinates[0][0][1]).toGeometry,
                    { "marker-color": color ? color : "#a664d1" },
                ),
            );
        });

        return points;
    }

    private edgeData(pathResult: PathResult): EdgeData[] {
        return this.removeDuplicateFromEdgeData(pathResult.edgeDatas[0].reducedEdge);
    }

    private removeDuplicateFromEdgeData(edgeData: EdgeData[]) {
        const cleanedEdgeData: EdgeData[] = [];
        edgeData.forEach((item: EdgeData) => {
            if (this.notIn(item, cleanedEdgeData)) cleanedEdgeData.push(item);
        });

        return cleanedEdgeData;
    }

    private inArray(item: any, array: any[]): boolean {
        let inArray = false;
        array.forEach(value => {
            if (value === item) inArray = true;
        });

        return inArray;
    }

    private notIn(item: any, array: any[]): boolean {
        let notInTheArray = true;
        array.forEach(value => {
            if (value.id === item.id) notInTheArray = false;
        });

        return notInTheArray;
    }

    public restaurantList(pathResult: PathResult, type: string[]): Restaurant[] {
        const edgeData = this.edgeData(pathResult);
        const restaurantList: Restaurant[] = [];

        edgeData.forEach((item: EdgeData) => {
            item.restaurants.forEach(restaurant => {
                if (this.inArray(restaurant.cuisine, type)) {
                    restaurantList.push(restaurant);
                }
            });
        });

        return restaurantList;
    }

    private pathResultToFeature(pathResult: PathResult): _Feature<LineStringGeometry> {
        return new _Feature<LineStringGeometry>(new LineString(pathResult.path).toGeometry, {
            data: this.edgeData(pathResult),
        });
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
}
