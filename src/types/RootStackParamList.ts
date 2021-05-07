import { NavigatorScreenParams } from "@react-navigation/native";
import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { LoginMutation } from "../screens/Login/types/loginMutation";
import { Mode } from "../screens/ViewAddEditActivity/ViewAddEditActivity";
import { Routes } from "./Routes";
import TripTabParamList from "./TripTabParamList";

type RootStackParamList = {
    [Routes.LOGIN]: {
        updateUser(user: LoginMutation["login"]["user"] | undefined): void;
    };
    [Routes.REGISTER]: undefined;
    [Routes.DASHBOARD]: undefined;
    [Routes.ITINERARY]: NavigatorScreenParams<TripTabParamList>;
    [Routes.ADD_TRIP]: undefined;
    [Routes.SHARE_TRIP]: { trip: CreateTripMutation["createTrip"] };
    [Routes.ADD_EDIT_ACTIVITY_GROUP]: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
    [Routes.VIEW_ADD_EDIT_ACTIVITY]: {
        activityId?: string;
        activityGroupId?: string;
        tripId: string;
        mode: Mode;
        activityName?: string;
    };
    [Routes.PROFILE]: {
        user: LoginMutation["login"]["user"];
        updateUser(user: LoginMutation["login"]["user"] | undefined): void;
    };
};

export default RootStackParamList;
