import logger from "../../../utils/logger";
import ReadFile from "../../../utils/readFile";
import JourneyRepo from "../../repository/journey-repo";
import { calculatePolygon } from "../../../utils/polygon";

export default class JourneySeed extends ReadFile {
    private journeyRepo: JourneyRepo;

    constructor(journeyRepo: JourneyRepo) {
        super();
        this.journeyRepo = journeyRepo;
    }

    async start() {
        const { features } = this.readFromfile("./seeding-data/montreal-bike-path.geojson");
        await this.journeyRepo.drop();
        try {
            features.map(async (row: any) => {
                await this.journeyRepo.create(this.translate(row, "montreal"));
            });
        } catch (e) {
            logger.error(e.message);
        }
        logger.info("SEEDING journey DONE");
    }

    private toPolygon(row: any) {
        const { coordinates } = row.geometry;
        if (!this.isALoop(coordinates[0])) {
            const polygon = calculatePolygon(coordinates[0]);
            return {
                type: "Polygon",
                coordinates: [polygon],
            };
        } else {
            logger.warn(`LOOP FOUND: ${row.properties.NOM_ARR_VI}`);
            return {
                type: "Polygon",
                coordinates: coordinates,
            };
        }
    }

    private isALoop(coordinate: any[]) {
        const lastIndex = coordinate.length - 1;
        return coordinate[0][0] === coordinate[lastIndex][0] && coordinate[0][1] === coordinate[lastIndex][1];
    }

    private translate(row: any, city: string) {
        return {
            segmentLength: row.properties.LONGUEUR,
            coating: row.properties.TYPE_VOIE,
            destination: row.properties.NOM_ARR_VI,
            saison4: row.properties.SAISONS4,
            city,
            created: row.created,
            geometry: row.geometry,
            polygon: this.toPolygon(row),
            isALoop: this.isALoop(row.geometry.coordinates[0]),
        };
    }
}
