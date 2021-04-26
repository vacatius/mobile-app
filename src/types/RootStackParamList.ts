import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";
import { TripRoutePoint } from "../types";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    TripItinerary: { tripId: string; tripName: string };
    ShareTrip: { trip: CreateTripMutation["createTrip"] };
    AddEditActivityGroup: {
        tripRoutePointToEdit?: TripRoutePoint;
        tripId: string;
    };
};

export default RootStackParamList;
