export interface GeoPolygonModel {
  type: string,
  coordinates: number[][][]
}

export default class GeoPolygon {
  coordinates: number[][][];
  type: string;

  constructor(coordinates: number[][][]) {
    this.coordinates = coordinates;
    this.type = "Polygon";
  }

  get toModel(): GeoPolygonModel {
    return {
      type: this.type,
      coordinates: this.coordinates,
    };
  }
}
