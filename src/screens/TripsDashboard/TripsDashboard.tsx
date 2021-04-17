import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Text } from "react-native-elements";
import ScreenHeader from "../../components/ScreenHeader";
import SvgLogo from "../../components/SvgLogo";
import TripCard from "../../components/TripCard/TripCard";
import RootStackParamList from "../../types/RootStackParamList";
import { TripsQuery, useTripsQuery } from "./types/trip-dashboard.query";

type TripsDashboardScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Dashboard"
>;

type Props = {
    navigation: TripsDashboardScreenNavigationProp;
};

export default function TripsDashboard(props: Props) {
    const { t } = useTranslation();
    const { data: tripsData, error, loading } = useTripsQuery();
    const [currentTrips, setCurrentTrips] = useState<TripsQuery["trips"]>([]);
    const [pastTrips, setPastTrips] = useState<TripsQuery["trips"]>([]);

    useEffect(() => {
        console.debug("[TripsDashboard] Trips data has changed");
        const currentTripsFiltered = tripsData?.trips.filter((trip) => {
            return new Date(trip.endDate).getTime() >= new Date().getTime();
        });
        const pastTripsFiltered = tripsData?.trips.filter((trip) => {
            return new Date(trip.endDate).getTime() < new Date().getTime();
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
    const openTripDetails = (trip: TripsQuery["trips"][0]) => {
        props.navigation.navigate("TripItinerary", {
            tripId: trip.id,
            tripName: trip.name,
        });
        console.log("Opening trip details");
    };

    return (
        <>
            <ScreenHeader screenTitle={t("screens.dashboard.dashboard")} />
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.scrollView}
            >
                <Text h3 style={styles.headlines}>
                    Current Trips
                </Text>
                {currentTrips &&
                    currentTrips?.map((trip) => {
                        return (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                openTripDetails={openTripDetails}
                            />
                        );
                    })}
                {(!currentTrips || currentTrips.length === 0) && (
                    <Text style={styles.noTripsFound}>
                        No current trips found.
                    </Text>
                )}
                <Text h3 style={styles.headlines}>
                    Past Trips
                </Text>
                {pastTrips &&
                    pastTrips?.map((trip) => {
                        return (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                openTripDetails={openTripDetails}
                            />
                        );
                    })}
                {(!pastTrips || pastTrips.length === 0) && (
                    <Text style={styles.noTripsFound}>
                        No past trips found.
                    </Text>
                )}
            </ScrollView>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.floatingTouchableOpacity}
            >
                <Button
                    icon={
                        <SvgLogo style={styles.logo} width={40} height={40} />
                    }
                    iconRight
                    title="Create Trip"
                    titleStyle={{
                        color: "white",
                        fontSize: 24,
                    }}
                    buttonStyle={styles.floatingButton}
                />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    logo: {
        alignSelf: "center",
        marginLeft: 10,
    },
    headlines: {
        marginBottom: 10,
        marginTop: 20,
        textAlign: "left",
    },
    noTripsFound: {
        textAlign: "center",
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
