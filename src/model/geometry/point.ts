export interface PointGeometry {
    type: string;
    coordinates: number[];
}

export default class Point {
    private readonly latitude: number;
    private readonly longitude: number;
    private readonly type: string;

    constructor(latitude: number, longitude: number) {
        this.latitude = typeof latitude === "string" ? parseFloat(latitude) : latitude;
        this.longitude = typeof longitude === "string" ? parseFloat(longitude) : longitude;
        this.type = "Point";
    }

    get toGeometry(): PointGeometry {
        return {
            type: this.type,
            coordinates: [this.longitude, this.latitude],
        };
    }
}
