import { FetchResult } from "@apollo/client";
import { TFunction } from "i18next";
import { Platform, Share, ShareContent } from "react-native";
import Toast from "react-native-toast-message";
import { getEnvironment } from "../get-environment";
import { CreateInvitationMutation } from "../screens/ShareTrip/types/create-invite.mutation";
import * as Linking from "expo-linking";

export const handleShare = (
    execute: Promise<FetchResult<CreateInvitationMutation>>,
    t: TFunction
): void => {
    execute
        .then((result) => {
            if (result.data?.createInvitation.id) {
                const expoLink = Linking.createURL(
                    "joinTrip/" + result.data?.createInvitation.id,
                    {}
                );
                console.log(expoLink);
                handleSystemShareSheet(
                    getEnvironment()?.invitationBaseUrl + encodeURIComponent(expoLink),
                    t
                );
            }
        })
        .catch((error) => {
            Toast.show({
                text1: t("error.generic"),
                text2: error.message,
                type: "error",
            });
        });
};

const handleSystemShareSheet = async (invitationLink: string, t: TFunction): Promise<void> => {
    try {
        let shareObject: ShareContent = {
            title: t("screens.shareTrip.androidShareSheetTitle"),
            message: invitationLink,
        };
        // Only use url to properly display shareable content in iOS share sheet
        if (Platform.OS === "ios") {
            shareObject = {
                url: invitationLink,
            };
        }

        await Share.share({ ...shareObject });
    } catch (error) {
        Toast.show({
            text1: t("error.generic"),
            text2: error.message,
            type: "error",
        });
    }
};
