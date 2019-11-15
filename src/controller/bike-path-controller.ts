import BikePathRepo from "../data/repository/bike-path";

export default class BikePathController {
    private bikePathRepo: BikePathRepo;
    constructor(journeyRepo: BikePathRepo) {
        this.bikePathRepo = journeyRepo;
    }

    async getBikePathForCity(city: string) {
        if (city === null) city = "Montreal";
        return await this.bikePathRepo.getByCity(city);
    }
}
