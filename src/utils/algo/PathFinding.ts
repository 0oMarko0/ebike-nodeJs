import * as turf from "@turf/turf";

const PathFinder = require("geojson-path-finder");
import Point, { PointGeometry } from "../../model/geometry/point";
import { Journey, toFeatureCollection } from "../../model/journey";
import Feature from "../../model/feature";
import { FeatureCollection, FeatureCollectionModel } from "../../model/feature-collection";
import LineString, { LineStringGeometry } from "../../model/geometry/line-string";
import { Restaurant } from "../../model/restaurant";

interface PathResult {
    path: number[][];
    edgeDatas: any[];
}

interface EdgeData {
    id: number;
    restaurants: Restaurant[];
}

export default class PathFinding {
    private readonly startingPointList: Feature<PointGeometry>[];
    private readonly finishingPointList: Feature<PointGeometry>[];
    private readonly startingPoint: Feature<PointGeometry>;
    private readonly finishingPoint: Feature<PointGeometry>;
    private network: any;

    get start(): Feature<PointGeometry> {
        return this.startingPoint;
    }

    get finish(): Feature<PointGeometry> {
        return this.finishingPoint;
    }

    constructor(startingArea: Journey[], finishingArea: Journey[], searchArea: Journey[]) {
        this.startingPointList = this.findAllPoint(startingArea, "#5fd173");
        this.finishingPointList = this.findAllPoint(finishingArea);
        this.startingPoint = this.calculatePoint(startingArea, "#6ad15a");
        this.finishingPoint = this.calculatePoint(finishingArea, "#a065d1");

        this.createNetwork(searchArea);
    }

    public findPath(start: Feature<PointGeometry>, end: Feature<PointGeometry>) {
        return this.network.findPath(start, end);
    }

    public findPathWithRestaurant(maxDistance: number, numberOfStop: number, type: string[]) {
        const featureCollection = new FeatureCollection();

        this.finishingPointList.forEach((finish: Feature<PointGeometry>) => {
            const path = this.findPath(this.startingPoint, finish);

            const restaurantList = this.restaurantList(path, type);
            featureCollection.add(this.pathResultToFeature(path).toModel);
        });

        return featureCollection;
    }

    private calculatePoint(area: Journey[], color?: string): Feature<PointGeometry> {
        return new Feature<PointGeometry>(
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

    public featureCollectionAllPoint(): FeatureCollectionModel {
        const featureCollection = new FeatureCollection();
        featureCollection.addFromList(this.startingPointList);
        featureCollection.addFromList(this.finishingPointList);
        return featureCollection.toModel;
    }

    private findAllPoint(journey: Journey[], color?: string): Feature<PointGeometry>[] {
        const points: Feature<PointGeometry>[] = [];

        journey.forEach((item: Journey) => {
            points.push(
                new Feature<PointGeometry>(
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

    // TODO: Refactor
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

    private pathResultToFeature(pathResult: PathResult): Feature<LineStringGeometry> {
        return new Feature<LineStringGeometry>(new LineString(pathResult.path).toGeometry, {
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
