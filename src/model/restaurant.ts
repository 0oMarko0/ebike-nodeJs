import { PointGeometry } from "./geometry/point";

export interface Restaurant {
    cuisine: string;
    name: string;
    geometry: PointGeometry;
}
