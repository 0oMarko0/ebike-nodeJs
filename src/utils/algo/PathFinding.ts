import * as turf from "@turf/turf";
import { Feature } from "@turf/helpers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PathFinder = require("geojson-path-finder");
import Point, { PointGeometry } from "../../model/geometry/point";
import { Journey, toFeatureCollection } from "../../model/journey";
import _Feature from "../../model/_Feature";
import { FeatureCollection } from "../../model/feature-collection";
import LineString, { LineStringGeometry } from "../../model/geometry/line-string";
import { Restaurant, toFeaturePoints } from "../../model/restaurant";
import logger from "../logger";
import _ from "lodash";

interface PathResult {
    path: number[][];
    edgeData: any[];
}

export default class PathFinding {
    private readonly finishingPointList: _Feature<PointGeometry>[];
    private readonly startingPoint: _Feature<PointGeometry>;
    private readonly restaurantsInArea: Restaurant[];
    private network: any;

    constructor(startingArea: Journey[], finishingArea: Journey[], searchArea: Journey[], restaurants: Restaurant[]) {
        if (startingArea.length === 0) throw new Error("Could not found a starting point, try a new location");

        this.finishingPointList = this.findAllPoint(finishingArea);
        this.startingPoint = this.calculatePoint(startingArea, "#6ad15a");
        this.restaurantsInArea = restaurants;

        this.createNetwork(searchArea);
    }

    get start(): _Feature<PointGeometry> {
        return this.startingPoint;
    }

    public findPath(start: _Feature<PointGeometry>, end: _Feature<PointGeometry>) {
        return this.network.findPath(start, end);
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

                if (maxDistance * 1.1 > distance && distance > maxDistance * 0.9) {
                    logger.info(`Path found with length: ${distance}`);
                    featureCollection.add(this.pathResultToFeature(path, distance).toModel);
                    featureCollection.addFromList(toFeaturePoints(this.sortRestaurants(path).slice(0, numberOfStop)));
                    break;
                }
            } catch (e) {
                logger.warn(`Unable To Find Path - Trying another finish point: ${e.message}`);
            }
        }

        return featureCollection;
    }

    private sortRestaurants(path: PathResult): Restaurant[] {
        const line = turf.lineString(path.path);

        const restaurantByDistance: Restaurant[] = [];

        this.restaurantsInArea.forEach((restaurant: Restaurant) => {
            const point = turf.point(restaurant.geometry.coordinates);
            const calculatedDistance = turf.pointToLineDistance(point, line);

            if (calculatedDistance <= 0.25) {
                restaurantByDistance.push(Object.assign(restaurant, { distance: calculatedDistance }));
            }
        });

        return _.sortBy(restaurantByDistance, "distance");
    }

    private calculatePoint(area: Journey[], color?: string): _Feature<PointGeometry> {
        return new _Feature<PointGeometry>(
            new Point(area[0].geometry.coordinates[0][0][0], area[0].geometry.coordinates[0][0][1]).toGeometry,
            { "marker-color": color ? color : "#6ad15a" },
        );
    }

    private createNetwork(searchArea: Journey[]) {
        this.network = new PathFinder(toFeatureCollection(searchArea));
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

    private pathResultToFeature(pathResult: PathResult, distance: number): _Feature<LineStringGeometry> {
        return new _Feature<LineStringGeometry>(new LineString(pathResult.path).toGeometry, { distance });
    }
}
