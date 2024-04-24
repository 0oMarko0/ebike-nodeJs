import { LINE_STRING, LineStringGeometry } from "./line-string";

export interface MultiLineStringGeometry {
    type: string;
    coordinates: number[][][];
}

export const MULTI_LINE_STRING = "MultiLineString";

export default class MultiLineString {
    private readonly type: string;
    private readonly coordinates: number[][][];

    constructor(coordinates: [][][]) {
        this.type = MULTI_LINE_STRING;
        this.coordinates = coordinates;
    }

    get toGeometry(): MultiLineStringGeometry {
        return {
            type: this.type,
            coordinates: this.coordinates,
        };
    }

    toLineString = (): LineStringGeometry => {
        return {
            type: LINE_STRING,
            coordinates: [].concat.apply([], this.coordinates),
        };
    };
}
