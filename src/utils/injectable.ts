const repo = {
    UserRepo: "UserRepo",
    RestaurantRepo: "RestaurantRepo",
    JourneyRepo: "JourneyRepo",
    BikePathRepo: "BikePathRepo",
    StatisticsRepo: "StatisticsRepo",
};

const controller = {
    UserController: "UserController",
    RestaurantController: "RestaurantController",
    JourneyController: "JourneyController",
    StatisticsController: "StatisticsController",
};

export const Injectable = {
    ...repo,
    ...controller,
};
