import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, ScrollView, Share, ShareContent, StyleSheet } from "react-native";
import { Avatar, Button, Header, Text } from "react-native-elements";
import SvgLogo from "../../components/SvgLogo";
import { getEnvironment } from "../../get-environment";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { useCreateInvitationMutation } from "./types/create-invite.mutation";

type ShareTripScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.SHARE_TRIP>;
type ShareTripScreenRouteProp = RouteProp<RootStackParamList, Routes.SHARE_TRIP>;

type Props = {
    navigation: ShareTripScreenNavigationProp;
    route: ShareTripScreenRouteProp;
};

export default function ShareTrip(props: Props): JSX.Element {
    const { t } = useTranslation();

    const trip = props.route.params.trip;
    const [execute, { loading }] = useCreateInvitationMutation();

    const handleShare = (): void => {
        execute({
            variables: {
                input: {
                    tripId: trip.id,
                },
            },
        })
            .then((result) => {
                if (result.data?.createInvitation.id) {
                    handleSystemShareSheet(
                        getEnvironment()?.invitationBaseUrl +
                            encodeURIComponent(result.data?.createInvitation.id)
                    );
                }
            })
            .catch((error) => console.error(error)); // TODO - Notify user with error modal
    };

    const handleSystemShareSheet = async (invitationLink: string): Promise<void> => {
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
            // TODO - Notify user with error modal
            console.error(error.message);
        }
    };

    return (
        <>
            <Header
                placement={"left"}
                containerStyle={styles.header}
                leftComponent={<Text h2>{trip.name}</Text>}
                rightComponent={
                    <Avatar
                        rounded
                        size="medium"
                        icon={{
                            name: "umbrella-beach",
                            type: "font-awesome-5",
                        }}
                        containerStyle={{ backgroundColor: "black" }}
                    /> // TODO - Add proper icon once backend provides one
                }
            />
            <ScrollView style={styles.scrollView}>
                {trip.description && <Text h4>{trip.description}</Text>}
                <SvgLogo style={styles.logo} height={150} width={150} />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.shareBtn}
                    title={t("screens.shareTrip.share")}
                    titleStyle={styles.btnTextStyle}
                    onPress={() => handleShare()}
                    loading={loading}
                />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.planTripBtn}
                    title={t("screens.shareTrip.planTrip")}
                    titleStyle={styles.btnTextStyle}
                    // TODO - Redirect to trip itinerary screen
                    onPress={() =>
                        props.navigation.reset({
                            index: 1,
                            routes: [
                                {
                                    name: Routes.DASHBOARD,
                                },
                                {
                                    name: Routes.ITINERARY,
                                    params: {
                                        tripId: props.route.params.trip.id,
                                        tripName: props.route.params.trip.name,
                                    },
                                },
                            ],
                        })
                    }
                />
                <Button
                    containerStyle={{ marginTop: -10 }}
                    buttonStyle={styles.backToDashboardBtn}
                    title={t("screens.shareTrip.goToDashboard")}
                    titleStyle={{ color: "black", fontSize: 20 }}
                    onPress={() => props.navigation.popToTop()}
                />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        color: "black",
    },
    scrollView: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    logo: {
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 40,
    },
    btnContainer: {
        marginBottom: 15,
    },
    btnTextStyle: {
        color: "black",
        fontSize: 25,
    },
    shareBtn: {
        backgroundColor: "#93C3FE",
    },
    planTripBtn: {
        backgroundColor: "#BCE1B0",
    },
    backToDashboardBtn: {
        backgroundColor: "transparent",
    },
});
