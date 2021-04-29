import { ActivityGroupData } from "../components/ActivityGroup";
import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";

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
    Profile: { userID: string };
};

export default RootStackParamList;
