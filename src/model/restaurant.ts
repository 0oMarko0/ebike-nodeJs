import Point, { PointGeometry } from "./geometry/point";
import _Feature from "./_Feature";

export interface Restaurant {
    cuisine: string;
    name: string;
    geometry: PointGeometry;
}

export const toFeaturePoint = (restaurant: Restaurant): _Feature<PointGeometry> => {
    const [longitude, latitude] = restaurant.geometry.coordinates;
    delete restaurant.geometry;

    return new _Feature<PointGeometry>(new Point(longitude, latitude).toGeometry, { data: restaurant });
};

export const toFeaturePoints = (restaurants: Restaurant[]): _Feature<PointGeometry>[] => {
    const feature: _Feature<PointGeometry>[] = [];
    restaurants.forEach((restaurant: Restaurant) => {
        feature.push(toFeaturePoint(restaurant));
    });

    return feature;
};
