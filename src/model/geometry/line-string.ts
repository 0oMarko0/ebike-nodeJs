export interface LineStringGeometry {
    type: string;
    coordinates: number[][];
}

export default class LineString {
    private readonly type: string;
    private readonly coordinates: number[][];

    constructor(coordinates: [][]) {
        this.type = "LineString";
        this.coordinates = coordinates;
    }

    get toGeometry(): LineStringGeometry {
        return {
            type: this.type,
            coordinates: this.coordinates,
        };
    }
}
