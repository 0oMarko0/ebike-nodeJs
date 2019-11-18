export interface MultiLineStringGeometry {
    type: string;
    coordinates: number[][][];
}

export default class MultiLineString {
    private readonly type: string;
    private readonly coordinates: number[][][];

    constructor(coordinates: [][][]) {
        this.type = "MultiLineString";
        this.coordinates = coordinates;
    }

    get toGeometry(): MultiLineStringGeometry {
        return {
            type: this.type,
            coordinates: this.coordinates,
        };
    }
}
