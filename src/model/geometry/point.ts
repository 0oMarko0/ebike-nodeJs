export interface PointGeometry {
    type: string;
    coordinates: number[];
}

export const POINT = "Point";

export default class Point {
    private readonly latitude: number;
    private readonly longitude: number;
    private readonly type: string;

    constructor(longitude: number, latitude: number) {
        this.latitude = typeof latitude === "string" ? parseFloat(latitude) : latitude;
        this.longitude = typeof longitude === "string" ? parseFloat(longitude) : longitude;
        this.type = POINT;
    }

    get toGeometry(): PointGeometry {
        return {
            type: this.type,
            coordinates: [this.longitude, this.latitude],
        };
    }
}
