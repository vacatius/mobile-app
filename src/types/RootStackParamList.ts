import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { LoginMutation } from "../screens/Login/types/loginMutation";

type RootStackParamList = {
    Login: {
        updateUser(user: LoginMutation["login"]["user"] | undefined): void;
    };
    Register: undefined;
    Dashboard: undefined;
    TripItinerary: { tripId: string; tripName: string };
    ShareTrip: { trip: CreateTripMutation["createTrip"] };
    AddEditActivityGroup: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
    Profile: {
        user: LoginMutation["login"]["user"];
        updateUser(user: LoginMutation["login"]["user"] | undefined): void;
    };
};

export default RootStackParamList;
