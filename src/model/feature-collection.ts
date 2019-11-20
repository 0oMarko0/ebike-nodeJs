import { FeatureModel } from "./feature";

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

    addFromList(featureList: any[], map?: Function) {
        if (map) {
            featureList.forEach(feature => {
                this.features.push(map(feature));
            });
        } else {
            featureList.forEach(feature => {
                this.features.push(feature);
            });
        }
    }
}
