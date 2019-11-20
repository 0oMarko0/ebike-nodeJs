const PathFinder = require("geojson-path-finder");
import Point, { PointGeometry } from "../../model/geometry/point";
import { Journey, toFeatureCollection } from "../../model/journey";
import Feature from "../../model/feature";
import { FeatureCollection, FeatureCollectionModel } from "../../model/feature-collection";

interface PathResult {
    path: number[][];
    edgeDatas: any[];
}

export default class PathFinding {
    private readonly startingArea: Journey[];
    private readonly finishingArea: Journey[];
    private readonly searchArea: Journey[];
    private network: any;

    constructor(startingArea: Journey[], finishingArea: Journey[], searchArea: Journey[]) {
        this.startingArea = startingArea;
        this.finishingArea = finishingArea;
        this.searchArea = searchArea;

        this.createNetwork();
    }

    public findPath(start: Feature<PointGeometry>, end: Feature<PointGeometry>) {
        return this.network.findPath(start, end);
    }

    public startingPoint(): Feature<PointGeometry> {
        return new Feature<PointGeometry>(
            new Point(
                this.startingArea[0].geometry.coordinates[0][0][0],
                this.startingArea[0].geometry.coordinates[0][0][1],
            ).toGeometry,
            { "marker-color": "#6ad15a" },
        );
    }

    public finishPoint(): Feature<PointGeometry> {
        return new Feature<PointGeometry>(
            new Point(
                this.finishingArea[0].geometry.coordinates[0][0][0],
                this.finishingArea[0].geometry.coordinates[0][0][1],
            ).toGeometry,
            { "marker-color": "#a065d1" },
        );
    }

    private createNetwork() {
        this.network = new PathFinder(toFeatureCollection(this.searchArea), {
            edgeDataReduceFn: (a: any, p: any) => this.dataReduce(a, p),
            edgeDataSeed: [],
        });
    }

    private dataReduce(data: any[], item: any) {
        data.push({ id: item.id, restaurants: item.restaurants });
        return data;
    }

    public featureCollectionAllPoint(): FeatureCollectionModel {
        const featureCollection = new FeatureCollection();
        featureCollection.addFromList(this.findAllStartingPoint());
        featureCollection.addFromList(this.findAllFinishingPoint());
        return featureCollection.toModel;
    }

    public findAllStartingPoint(): Feature<PointGeometry>[] {
        return this.findAllPoint(this.startingArea, "#5fd173");
    }

    public findAllFinishingPoint(): Feature<PointGeometry>[] {
        return this.findAllPoint(this.finishingArea);
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

    public edgeData(pathResult: PathResult) {
        return this.removeDuplicateFromEdgeData(pathResult.edgeDatas[0].reducedEdge);
    }

    public removeDuplicateFromEdgeData(edgeData: any[]) {
        const cleanedEdgeData: any[] = [];
        edgeData.forEach((item: any) => {
            if (this.notIn(item, cleanedEdgeData)) cleanedEdgeData.push(item);
        });

        return cleanedEdgeData;
    }

    private notIn(item: any, array: any[]): boolean {
        let notInTheArray = true;
        array.forEach(value => {
            if (value.id === item.id) notInTheArray = false;
        });

        return notInTheArray;
    }
}
