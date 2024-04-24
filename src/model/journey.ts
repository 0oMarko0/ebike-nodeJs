import { MultiLineStringGeometry } from "./geometry/mutli-line-string";
import _Feature from "./_Feature";
import LineString, { LineStringGeometry } from "./geometry/line-string";
import { Restaurant } from "./restaurant";
import { FeatureCollection, FeatureCollectionModel } from "./feature-collection";

export interface Journey {
    id: number;
    segmentLength: number;
    coating: number;
    destination: string;
    saison4: string;
    city: string;
    created: number;
    geometry: MultiLineStringGeometry;
    hasRestaurants: boolean;
    restaurants: Restaurant[];
}

const flattenCoordinates = (coordinates: number[][][]): number[][] => {
    return [].concat.apply([], coordinates);
};

export const toLineStringFeature = (journey: Journey): _Feature<LineStringGeometry> => {
    return new _Feature<LineStringGeometry>(
        new LineString(flattenCoordinates(journey.geometry.coordinates)).toGeometry,
        {
            id: journey.id,
            hasRestaurants: journey.hasRestaurants,
            restaurants: journey.hasRestaurants ? journey.restaurants : [],
        },
    );
};

export const toFeatureCollection = (journey: Journey[]): FeatureCollectionModel => {
    const featureCollection = new FeatureCollection();
    featureCollection.addFromList(journey, (item: Journey) => {
        return toLineStringFeature(item);
    });

    return featureCollection.toModel;
};
