const radius = 50;
const radiusToRadianMultiplier = 1 / 98000;

export const calculatePolygon = (lineString: number[][]) => {
    const start = lineString[0];
    const end = lineString[lineString.length - 1];
    const angle = Math.atan2(end[0] - start[0], end[1] - start[1]) + Math.PI / 2;
    const distA = Math.sin(angle) * radius * radiusToRadianMultiplier;
    const distB = Math.cos(angle) * radius * radiusToRadianMultiplier;

    return [
        [start[0] - distA, start[1] - distB],
        [end[0] - distA, end[1] - distB],
        [end[0] + distA, end[1] + distB],
        [start[0] + distA, start[1] + distB],
        [start[0] - distA, start[1] - distB],
    ];
};
