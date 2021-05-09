import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Platform,
    ScrollView,
    Share,
    ShareContent,
    StyleSheet,
} from "react-native";
import { Avatar, Button, Header, Text } from "react-native-elements";
import Toast from "react-native-toast-message";
import SvgLogo from "../../components/SvgLogo";
import { getEnvironment } from "../../get-environment";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { refetchTripsQuery } from "../TripsDashboard/types/trip-dashboard.query";
import { useCreateInvitationMutation } from "./types/create-invite.mutation";
import { useGetTripQuery } from "./types/get-trip.query";
import { useJoinTripMutation } from "./types/join-trip.mutation";
import * as Linking from "expo-linking";

export enum Mode {
    SHARE_TRIP,
    JOIN_TRIP,
}

type ShareTripScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.SHARE_TRIP
>;
type ShareTripScreenRouteProp = RouteProp<
    RootStackParamList,
    Routes.SHARE_TRIP
>;

type Props = {
    navigation: ShareTripScreenNavigationProp;
    route: ShareTripScreenRouteProp;
};

export default function ShareTrip(props: Props): JSX.Element {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>(props.route.params.mode);

    useEffect(() => {
        async function getInitialUrl(): Promise<void> {
            const link = await Linking.getInitialURL();
            if (link && link !== null) {
                console.log("we got a initial URL link");
                console.log(link);
            }
        }
        getInitialUrl();
        Linking.addEventListener("url", (event) => {
            console.log("got event listener callback");
            console.log(event);
        });
    }, []);

    const paramsTripId = props.route.params.tripId;
    const [
        executeCreateInvitation,
        { loading: loadingCreateInvitation },
    ] = useCreateInvitationMutation();
    const [
        executeJoinTripMutation,
        { data: joinTripData, loading: loadingJoinTrip },
    ] = useJoinTripMutation();

    const { data: trip, error: getTripError } = useGetTripQuery({
        variables: {
            tripId: paramsTripId,
        },
    });

    const handleSubmitButton = (): void => {
        if (mode === Mode.SHARE_TRIP) {
            executeCreateInvitation({
                variables: {
                    input: {
                        tripId: trip?.trip.id || "",
                    },
                },
            })
                .then((result) => {
                    if (result.data?.createInvitation.id) {
                        // exp://exp.host/@community/with-webbrowser-redirect/--/shareTrip/90194i0294i4240
                        const expoLink = Linking.createURL(
                            "joinTrip/" + result.data?.createInvitation.id
                        );
                        console.log(expoLink);

                        // https://vacatius.com/invite/shareTrip/90194i0294i4240
                        handleSystemShareSheet(
                            getEnvironment()?.invitationBaseUrl +
                                encodeURIComponent(
                                    result.data?.createInvitation.id
                                )
                        );
                    }
                })
                .catch((error) => console.error(error)); // TODO - Notify user with error modal
        } else if (mode === Mode.JOIN_TRIP) {
            executeJoinTripMutation({
                variables: {
                    input: {
                        invitationId: "", // TODO
                        tripId: trip?.trip.id || "",
                    },
                },
                refetchQueries: [refetchTripsQuery()],
            })
                .then(() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: Routes.DASHBOARD,
                            },
                        ],
                    });
                })
                .catch((error) => {
                    console.error(error);
                    Toast.show({
                        text1: t("error.generic"),
                        text2: error.message,
                        type: "error",
                    });
                });
        }
    };

    const handleSystemShareSheet = async (
        invitationLink: string
    ): Promise<void> => {
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

    if (!trip) {
        return (
            <>
                <Text>{getTripError}</Text>
            </>
        );
    }

    return (
        <>
            <Header
                placement={"left"}
                containerStyle={styles.header}
                leftComponent={<Text h2>{trip.trip.name}</Text>}
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
                {trip.trip.description && (
                    <Text h4>{trip.trip.description}</Text>
                )}
                <SvgLogo style={styles.logo} height={150} width={150} />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.shareBtn}
                    title={t("screens.shareTrip.share")}
                    titleStyle={styles.btnTextStyle}
                    onPress={() => handleSubmitButton()}
                    loading={loadingCreateInvitation}
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
                                        tripId: trip.trip.id,
                                        tripName: trip.trip.name,
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
