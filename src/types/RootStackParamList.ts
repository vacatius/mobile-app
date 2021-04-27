import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { Mode } from "../screens/ViewAddEditActivity/ViewAddEditActivity";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    TripItinerary: { tripId: string; tripName: string };
    ShareTrip: { trip: CreateTripMutation["createTrip"] };
    AddEditActivityGroup: {
        tripRoutePointToEdit?: ActivityGroupData;
        tripId: string;
    };
    ViewEditActivity: {
        activityId?: string;
        mode: Mode;
    };
};

export default RootStackParamList;
