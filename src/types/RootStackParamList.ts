import { NavigatorScreenParams } from "@react-navigation/native";
import { ActivityGroupData } from "../components/ActivityGroup";
import { LoginMutation } from "../screens/Login/types/loginMutation";
import { Mode as ShareJoinTripMode } from "../screens/ShareTrip/ShareTrip";
import { Mode as ActivityMode } from "../screens/ViewAddEditActivity/ViewAddEditActivity";
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
    [Routes.SHARE_TRIP]: {
        tripId: string;
        mode: ShareJoinTripMode;
        invitationId?: string; // TODO
    };
    [Routes.ADD_EDIT_ACTIVITY_GROUP]: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
    [Routes.VIEW_ADD_EDIT_ACTIVITY]: {
        activityId?: string;
        activityGroupId?: string;
        tripId: string;
        mode: ActivityMode;
        activityName?: string;
    };
    [Routes.PROFILE]: {
        user: LoginMutation["login"]["user"];
        updateUser(user: LoginMutation["login"]["user"] | undefined): void;
    };
};

export default RootStackParamList;
