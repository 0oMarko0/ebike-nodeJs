"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meterToKilo = (meter) => {
    return exports.roundTwoDecimal(meter / 1000);
};
exports.roundTwoDecimal = (numberToRound) => {
    return Math.round(numberToRound * 100) / 100;
};
//# sourceMappingURL=unitConversion.js.map