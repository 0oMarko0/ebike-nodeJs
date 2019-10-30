export const meterToKilo = (meter: number) => {
    return roundTwoDecimal(meter / 1000);
};

export const roundTwoDecimal = (numberToRound: number) => {
    return Math.round(numberToRound * 100) / 100;
};
