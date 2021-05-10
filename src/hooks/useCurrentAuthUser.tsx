import * as SecureStore from "expo-secure-store";
import { LoginMutation } from "../screens/Login/types/loginMutation";
import SecureStorageItems from "../types/SecureStorageItems";

const useCurrentAuthUser = (): {
    getCurrentUser: () => Promise<LoginMutation["login"]["user"] | undefined>;
} => {
    const getCurrentUser = async (): Promise<LoginMutation["login"]["user"] | undefined> => {
        const currentUser = await SecureStore.getItemAsync(SecureStorageItems.CURRENT_USER);
        if (currentUser === null) {
            return undefined;
        }
        return JSON.parse(currentUser);
    };

    return { getCurrentUser };
};
export default useCurrentAuthUser;
