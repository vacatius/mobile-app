import { FetchResult } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Button, Header, Text } from "react-native-elements";
import Toast from "react-native-toast-message";
import SvgLogo from "../../components/SvgLogo";
import { handleShare } from "../../services/shareSheetHandler";
import { theme } from "../../theme/theme";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { refetchTripsQuery } from "../TripsDashboard/types/trip-dashboard.query";
import {
    CreateInvitationMutation,
    useCreateInvitationMutation,
} from "./types/create-invite.mutation";
import { useGetInvitationLazyQuery } from "./types/get-invitation.query";
import { useGetTripLazyQuery } from "./types/get-trip.query";
import { useJoinTripMutation } from "./types/join-trip.mutation";
import * as Linking from "expo-linking";

export enum Mode {
    SHARE_TRIP,
    JOIN_TRIP,
}

type ShareTripScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.SHARE_TRIP>;
type ShareTripScreenRouteProp = RouteProp<RootStackParamList, Routes.SHARE_TRIP>;

type Props = {
    navigation: ShareTripScreenNavigationProp;
    route: ShareTripScreenRouteProp;
};

export default function ShareTrip(props: Props): JSX.Element {
    const { t } = useTranslation();
    const [mode] = useState<Mode>(props.route.params.tripId ? Mode.SHARE_TRIP : Mode.JOIN_TRIP);

    useEffect(() => {
        async function getInitialUrl(): Promise<void> {
            const link = await Linking.getInitialURL();
            if (link) {
                console.log("[Share Trip] we got a initial URL link");
                console.log("[Share Trip] ", link);
            }
        }
        getInitialUrl();
        Linking.addEventListener("url", (event) => {
            console.log("[Share Trip] got event listener callback");
            console.log("[Share Trip] ", event);
        });
    }, []);

    const [executeCreateInvitation, { loading: loadingCreateInvitation }] =
        useCreateInvitationMutation();
    const [executeJoinTripMutation, { loading: loadingJoinTrip }] = useJoinTripMutation();

    const [executeGetTripQuery, { data: trip, error: getTripError, called: tripQueryCalled }] =
        useGetTripLazyQuery();

    const [executeGetInvitation, { data: invitation, called: invitationQueryCalled }] =
        useGetInvitationLazyQuery({
            notifyOnNetworkStatusChange: true,
            fetchPolicy: "network-only",
            onCompleted: (data) => {
                executeGetTripQuery({
                    variables: {
                        tripId: data.invitation.trip.id,
                    },
                });
            },
        });

    if (mode === Mode.SHARE_TRIP && !tripQueryCalled) {
        console.log("fetching share trip data", props.route.params.tripId);
        executeGetTripQuery({
            variables: {
                tripId: props.route.params.tripId,
            },
        });
    } else if (mode === Mode.JOIN_TRIP && !tripQueryCalled && !invitationQueryCalled) {
        console.log("fetching join data", props.route.params.invitationId);
        if (props.route.params.invitationId) {
            executeGetInvitation({
                variables: { invitationId: props.route.params.invitationId },
            });
        }
    }

    const handleSubmitButton = (): void => {
        if (mode === Mode.SHARE_TRIP) {
            const getInvitationLinkPromise = (): Promise<FetchResult<CreateInvitationMutation>> => {
                return executeCreateInvitation({
                    variables: {
                        input: {
                            tripId: trip?.trip.id || "",
                        },
                    },
                });
            };
            handleShare(getInvitationLinkPromise(), t);
        } else if (mode === Mode.JOIN_TRIP && invitation) {
            executeJoinTripMutation({
                variables: {
                    input: {
                        invitationId: invitation.invitation.id,
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

    const handlePlanTripNavigation = (): void => {
        props.navigation.reset({
            index: 1,
            routes: [
                {
                    name: Routes.DASHBOARD,
                },
                {
                    name: Routes.ITINERARY,
                    params: {
                        screen: Routes.ITINERARY,
                        params: {
                            tripId: trip?.trip.id,
                            tripName: trip?.trip.name,
                        },
                    },
                },
            ],
        });
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
                leftComponent={<Text style={theme.fonts.title.style}>{trip.trip.name}</Text>}
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
                    <Text style={theme.fonts.regular.style}>{trip.trip.description}</Text>
                )}
                <SvgLogo style={styles.logo} height={150} width={150} />
                {mode === Mode.SHARE_TRIP && (
                    <Button
                        containerStyle={theme.button.secondaryButton.container}
                        buttonStyle={theme.button.secondaryButton.button}
                        title={t("screens.shareTrip.share")}
                        titleStyle={theme.button.secondaryButton.title}
                        onPress={() => handleSubmitButton()}
                        loading={loadingCreateInvitation}
                    />
                )}
                <Button
                    containerStyle={theme.button.primaryButton.container}
                    buttonStyle={theme.button.primaryButton.button}
                    title={t(
                        mode === Mode.SHARE_TRIP
                            ? "screens.shareTrip.planTrip"
                            : "screens.shareTrip.joinTrip"
                    )}
                    titleStyle={theme.button.primaryButton.title}
                    onPress={() => {
                        if (mode === Mode.JOIN_TRIP && invitation) {
                            executeJoinTripMutation({
                                variables: {
                                    input: {
                                        tripId: trip.trip.id,
                                        invitationId: invitation.invitation.id,
                                    },
                                },
                            })
                                .then(() => handlePlanTripNavigation())
                                .catch((err) => {
                                    console.error(err);
                                    Toast.show({
                                        text1: t("error.generic"),
                                        text2: err.message,
                                        type: "error",
                                    });
                                });
                        } else {
                            handlePlanTripNavigation();
                        }
                    }}
                    loading={mode === Mode.JOIN_TRIP ? loadingJoinTrip : false}
                />
                <Button
                    containerStyle={theme.button.tertiaryButton.container}
                    type="clear"
                    title={t(
                        mode === Mode.SHARE_TRIP
                            ? "screens.shareTrip.goToDashboard"
                            : "screens.shareTrip.cancelJoin"
                    )}
                    titleStyle={theme.button.tertiaryButton.title}
                    onPress={() =>
                        mode === Mode.SHARE_TRIP
                            ? props.navigation.popToTop()
                            : props.navigation.reset({
                                  index: 0,
                                  routes: [
                                      {
                                          name: Routes.DASHBOARD,
                                      },
                                  ],
                              })
                    }
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
        paddingLeft: theme.view.container.spacing,
        paddingRight: theme.view.container.spacing,
    },
    logo: {
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 40,
    },
});
