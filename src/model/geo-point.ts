interface Point {
    latitude: number;
    longitude: number;
}

export interface GeoPointModel {
    type: string;
    coordinates: Point;
}

export default class GeoPoint {
    latitude: number;
    longitude: number;
    type: string;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = "GeoPoint";
    }

    get toModel(): GeoPointModel {
        return {
            type: this.type,
            coordinates: { latitude: this.latitude, longitude: this.longitude },
        };
    }
}
