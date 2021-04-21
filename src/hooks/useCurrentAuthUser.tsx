import { useApolloClient } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import SecureStorageItems from "../types/SecureStorageItems";

const useCurrentAuthUser = () => {
    const getCurrentUser = async () => {
        const currentUser = await SecureStore.getItemAsync(
            SecureStorageItems.CURRENT_USER
        );
        if (currentUser === null) {
            console.log("no current user found");
            return undefined;
        }
        console.log("Found a current user");
        return JSON.parse(currentUser);
    };

    return { getCurrentUser };
};
export default useCurrentAuthUser;
