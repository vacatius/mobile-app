import { RouteProp, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Text } from "react-native-elements";
import SvgLogo from "../../components/SvgLogo";
import TripCard from "../../components/TripCard/TripCard";
import { theme } from "../../theme/theme";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { TripsQuery, useTripsQuery } from "./types/trip-dashboard.query";

type TripsDashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.DASHBOARD>;
type TripsDashboardScreenRouteProp = RouteProp<RootStackParamList, Routes.DASHBOARD>;
type Props = {
    navigation: TripsDashboardScreenNavigationProp;
    route: TripsDashboardScreenRouteProp;
};

export default function TripsDashboard(props: Props): JSX.Element {
    const { t } = useTranslation();
    const { data: tripsData, error, loading } = useTripsQuery();
    const [currentTrips, setCurrentTrips] = useState<TripsQuery["trips"]>([]);
    const [pastTrips, setPastTrips] = useState<TripsQuery["trips"]>([]);
    const nav = useNavigation();

    useEffect(() => {
        console.debug("[TripsDashboard] Trips data has changed");
        const currentTripsFiltered = tripsData?.trips.filter((trip) => {
            const noStartAndEndDate = trip.startDate === null && trip.endDate === null;
            const startDateInFuture =
                trip.startDate !== null &&
                new Date(trip.startDate).getTime() >= new Date().getTime() &&
                trip.endDate === null;
            const endDateInFuture = new Date(trip.endDate).getTime() >= new Date().getTime();
            return noStartAndEndDate || startDateInFuture || endDateInFuture;
        });
        const pastTripsFiltered = tripsData?.trips.filter((trip) => {
            const startAndEndDateInPast =
                trip.startDate !== null &&
                trip.endDate !== null &&
                new Date(trip.endDate).getTime() < new Date().getTime();
            const startDateInPast =
                trip.startDate !== null &&
                new Date(trip.startDate).getTime() <= new Date().getTime() &&
                trip.endDate === null;
            return startAndEndDateInPast || startDateInPast;
        });

        setCurrentTrips(currentTripsFiltered || []);
        setPastTrips(pastTripsFiltered || []);
    }, [tripsData]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }
    if (error) {
        console.error(error);
        return (
            <View>
                <Text>An error has occurred. {error.message}</Text>
            </View>
        );
    }
    const openTripDetails = (trip: TripsQuery["trips"][0]): void => {
        props.navigation.navigate(Routes.ITINERARY, {
            screen: Routes.ITINERARY,
            params: {
                tripId: trip.id,
                tripName: trip.name,
            },
        });
        console.log("Opening trip details for tripId: " + trip.id);
    };
    const addTrip = (): void => {
        console.log("Add trip button pressed");
        nav.navigate(Routes.ADD_TRIP);
    };
    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Text style={theme.fonts.subtitle.style}>
                        {t("screens.dashboard.currentTrips")}
                    </Text>
                    {currentTrips &&
                        currentTrips?.map((trip) => (
                            <TripCard key={trip.id} trip={trip} openTripDetails={openTripDetails} />
                        ))}
                    {(!currentTrips || currentTrips.length === 0) && (
                        <Text style={theme.fonts.regularCenter.style}>
                            {t("screens.dashboard.errors.noTripsFound")}
                        </Text>
                    )}
                    <Text style={theme.fonts.subtitle.style}>
                        {t("screens.dashboard.pastTrips")}
                    </Text>
                    {pastTrips &&
                        pastTrips?.map((trip) => (
                            <TripCard key={trip.id} trip={trip} openTripDetails={openTripDetails} />
                        ))}
                    {(!pastTrips || pastTrips.length === 0) && (
                        <Text style={theme.fonts.regularCenter.style}>
                            {t("screens.dashboard.errors.noTripsFound")}
                        </Text>
                    )}
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity activeOpacity={0.7} style={styles.floatingTouchableOpacity}>
                <Button
                    icon={<SvgLogo style={styles.logo} width={40} height={40} />}
                    iconRight
                    title={t("screens.add_trip.title")}
                    titleStyle={{
                        color: "white",
                        fontSize: theme.button.primaryButton.title.fontSize,
                    }}
                    buttonStyle={styles.floatingButton}
                    onPress={addTrip}
                />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: theme.view.container.spacing,
        marginRight: theme.view.container.spacing,
        marginBottom: theme.view.container.spacing,
    },
    logo: {
        alignSelf: "center",
        marginLeft: 10,
    },
    floatingButton: {
        height: 70,
        width: 195,
        borderRadius: 40,
        backgroundColor: "#F7A223",
        borderWidth: 2,
        borderColor: "#EAA045",
    },
    floatingTouchableOpacity: {
        position: "absolute",
        width: 130,
        height: 110,
        right: 47,
        bottom: 15,
        alignItems: "center",
        justifyContent: "center",
    },
});
