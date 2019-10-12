const repo = {
    UserRepo: "UserRepo",
    RestaurantRepo: "RestaurantRepo",
    JourneyRepo: "JourneyRepo",
};

const controller = {
    UserController: "UserController",
    RestaurantController: "RestaurantController",
    JourneyController: "JourneyController",
};

export const Injectable = {
    ...repo,
    ...controller,
};
