import { useApolloClient } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import SecureStorageItems from "../types/SecureStorageItems";

const useCurrentAuthUser = () => {
    const getCurrentUser = async () => {
        let currentUser = await SecureStore.getItemAsync(
            SecureStorageItems.CURRENT_USER
        );
        if (currentUser === null) {
            console.log("no current user found");
            return undefined;
        }
        currentUser = JSON.parse(currentUser);
        console.log("Found a current user");
        return currentUser;
    };

    return { getCurrentUser };
};
export default useCurrentAuthUser;
