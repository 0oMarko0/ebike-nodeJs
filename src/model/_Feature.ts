export interface FeatureModel<t> {
    type: string;
    geometry: t;
    properties: any;
}

export default class _Feature<t> {
    private readonly type: string;
    private readonly properties: any;
    private readonly geometry: t;

    constructor(geometry: t, properties?: any) {
        this.type = "Feature";
        this.properties = properties ? properties : {};
        this.geometry = geometry;
    }

    get toModel() {
        return {
            type: this.type,
            geometry: this.geometry,
            properties: this.properties,
        };
    }
}
