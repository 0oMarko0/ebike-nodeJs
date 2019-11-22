export interface PolygonGeometry {
    type: string;
    coordinates: number[][][];
}

export default class Polygon {
    coordinates: number[][][];
    type: string;

    constructor(coordinates: number[][][]) {
        this.coordinates = coordinates;
        this.type = "Polygon";
    }

    get toGeometry(): PolygonGeometry {
        return {
            type: this.type,
            coordinates: this.coordinates,
        };
    }
}
