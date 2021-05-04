import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { Routes } from "./Routes";

type RootStackParamList = {
    [Routes.LOGIN]: undefined;
    [Routes.REGISTER]: undefined;
    [Routes.DASHBOARD]: undefined;
    [Routes.ITINERARY]: { tripId: string; tripName: string };
    [Routes.ADD_TRIP]: undefined;
    [Routes.SHARE_TRIP]: { trip: CreateTripMutation["createTrip"] };
    [Routes.ADD_EDIT_ACTIVITY_GROUP]: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
};

export default RootStackParamList;
