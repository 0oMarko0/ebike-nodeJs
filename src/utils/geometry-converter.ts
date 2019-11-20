import { MultiLineStringGeometry } from "../model/geometry/mutli-line-string";
import { LineStringGeometry } from "../model/geometry/line-string";

const toLineString = (multilineString: MultiLineStringGeometry): LineStringGeometry => {
    return {
        type: "LineString",
        coordinates: [].concat.apply([], multilineString.coordinates),
    };
};
