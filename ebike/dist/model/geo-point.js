"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeoPoint {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = "GeoPoint";
    }
    get toModel() {
        return {
            type: this.type,
            coordinates: { latitude: this.latitude, longitude: this.longitude },
        };
    }
}
exports.default = GeoPoint;
//# sourceMappingURL=geo-point.js.map