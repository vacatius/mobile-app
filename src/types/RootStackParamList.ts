import { CreateTripMutation } from "../screens/AddTrip/types/add-trip.mutation";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    ShareTrip: { trip: CreateTripMutation["createTrip"] };
};

export default RootStackParamList;
