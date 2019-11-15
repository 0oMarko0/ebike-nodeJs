export interface GeoPointModel {
    type: string;
    coordinates: number[];
}

export default class GeoPoint {
    latitude: number;
    longitude: number;
    type: string;

    constructor(latitude: number, longitude: number) {
        this.latitude = typeof latitude === "string" ? parseFloat(latitude) : latitude;
        this.longitude = typeof longitude === "string" ? parseFloat(longitude) : longitude;
        this.type = "GeoPoint";
    }

    get toModel(): GeoPointModel {
        return {
            type: this.type,
            coordinates: [this.longitude, this.latitude],
        };
    }
}
