import { Routes } from "./Routes";

type TripTabParamList = {
    TripTabsNavigation: {
        params: {
            tripId: string;
            tripName: string;
        };
    };
    [Routes.ITINERARY]: { tripId: string; tripName: string };
    [Routes.TRIP_SETTINGS]: {
        tripId: string;
    };
};

export default TripTabParamList;
