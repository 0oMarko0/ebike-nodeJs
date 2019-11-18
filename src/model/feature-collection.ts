import Feature, { FeatureModel } from "./feature";

export interface FeatureCollectionModel {
    type: string;
    name: string;
    features: FeatureModel<any>[];
}

export class FeatureCollection {
    private readonly type: string;
    private readonly name: string;
    private readonly features: FeatureModel<any>[];

    constructor(name?: string) {
        this.type = "FeatureCollection";
        this.name = name ? name : "collection";
        this.features = [];
    }

    get toModel(): FeatureCollectionModel {
        return {
            type: this.type,
            name: this.name,
            features: this.features,
        };
    }

    add(feature: FeatureModel<any>) {
        this.features.push(feature);
    }

    addFromList(featureList: any[], map: Function) {
        featureList.forEach((feature) => {
           this.features.push(map(feature));
        });
    }


    private buildFeature(journey: any[]) {
        let features: any[] = [];
        const featureCollection = {
            type: "FeatureCollection",
            name: "Network",
        };

        journey.forEach(item => {
            const newItem = (coords: any) => ({
                type: "LineString",
                coordinates: coords,
            });
            features.push({
                type: "Feature",
                geometry: newItem(item.geometry.coordinates[0]),
                properties: {
                    id: item.id,
                    hasRestaurants: item.hasRestaurants,
                    restaurants: item.hasRestaurants ? item.restaurants : [],
                },
            });
        });

        Object.assign(featureCollection, { features: features });

        return featureCollection;
    }
}
