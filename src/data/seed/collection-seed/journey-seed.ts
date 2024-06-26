import logger from "../../../utils/logger";
import ReadFile from "../../../utils/readFile";
import JourneyRepo from "../../repository/journey-repo";

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

    private translate(row: any, city: string) {
        return {
            segmentLength: row.properties.LONGUEUR,
            coating: row.properties.TYPE_VOIE,
            destination: row.properties.NOM_ARR_VI,
            saison4: row.properties.SAISONS4,
            city,
            created: row.created,
            geometry: row.geometry,
            id: parseInt(row.properties.ID),
        };
    }
}
