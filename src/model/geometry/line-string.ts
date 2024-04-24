import { MULTI_LINE_STRING, MultiLineStringGeometry } from "./mutli-line-string";

export interface LineStringGeometry {
    type: string;
    coordinates: number[][];
}

export const LINE_STRING = "LineString";

export default class LineString {
    private readonly type: string;
    private readonly coordinates: number[][];

    constructor(coordinates: number[][]) {
        this.type = LINE_STRING;
        this.coordinates = coordinates;
    }

    get toGeometry(): LineStringGeometry {
        return {
            type: this.type,
            coordinates: this.coordinates,
        };
    }

    toMultiLineString(): MultiLineStringGeometry {
        return {
            type: MULTI_LINE_STRING,
            coordinates: [this.coordinates],
        };
    }
}
