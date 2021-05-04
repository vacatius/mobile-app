import { NavigatorScreenParams } from "@react-navigation/native";
import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { Routes } from "./Routes";
import TripTabParamList from "./TripTabParamList";

type RootStackParamList = {
    [Routes.LOGIN]: undefined;
    [Routes.REGISTER]: undefined;
    [Routes.DASHBOARD]: undefined;
    [Routes.ITINERARY]: NavigatorScreenParams<TripTabParamList>;
    [Routes.ADD_TRIP]: undefined;
    [Routes.SHARE_TRIP]: { trip: CreateTripMutation["createTrip"] };
    [Routes.ADD_EDIT_ACTIVITY_GROUP]: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
};

export default RootStackParamList;
