import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-elements";
import { RootStackParamList } from "../../App";
import ScreenHeader from "../components/ScreenHeader";
import TripCard from "../components/TripCard/TripCard";
import { TripUserRole } from "../types.d";
import { StyleSheet } from "react-native";
import { TripsQuery } from "../components/TripCard/types/trip-dashboard.query";

type TripsDashboardScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Dashboard"
>;

type Props = {
    navigation: TripsDashboardScreenNavigationProp;
};

export default function TripsDashboard(props: Props) {
    const { t } = useTranslation();
    const openTripDetails = (trip: TripsQuery["trips"][0]) => {
        console.log("Opening trip details");
    }
    const mockedTrips = [{
        id: "VHJpcDpiMmQxYzI2OS02YTY2LTQ4YmEtOGE5OS0zZTYzZGI3YTQ3Mjg=",
        createdAt: "2021-03-28T17:29:21.742Z",
        name: "Roadtrip 2022",
        description: "Roadtrip to Germany and Denmark",
        startDate: new Date("2021-05-02"),
        endDate: new Date("2021-05-10"),
        members: [
            {
                "id": "VHJpcE1lbWJlcjpiOGQyYjM2Mi0yY2JmLTRhYmUtOTQwMS1lY2M0ODMxODhhYTA=",
                role: TripUserRole.Admin,
                color: "#f9acbf",
                user: {
                    id: "VXNlcjo2MDUwYjUxYTZmN2FiZjIxMjA2NTI4MzY=",
                    displayName: "Valentin",
                    username: "testuser",
                    email: "test@test.com",
                },
            },
            {
                "id": "VHJpcE1lbWJlcjoxYjk2MmNmNS02NmMxLTQ3NDUtOWU2MC1jZGRmOWYyOTIwYjI=",
                role: TripUserRole.Member,
                color: "#fff1a5",
                user: {
                    id:
                        "VXNlcjphZjY2NWJhMi1kZTU3LTRjNmEtYWI4ZS02NjkyN2M1Y2FjYWM=",
                    displayName: "Testuser2",
                    username: "testuser2",
                    email: "test@test.com",
                },
            },
        ],
    },
    {
        id: "VHJpcDpiMmQxYzI2OS02YTY2LTQ4YmEtOGE5OS0zZTYzZYI3YTQ3Mjg=",
        createdAt: "2021-03-28T17:29:21.742Z",
        name: "Roadtrip 2023",
        description: "Very Nice trip",
        startDate: new Date("2022-05-02"),
        endDate: new Date("2022-05-10"),
        members: [
            {
                "id": "VHJpcE1lbWJlcjpiOGQyYjM2Mi0yY2JmLTRhYmUtYTQwMS1lY2M0ODMxODhhYTA=",
                role: TripUserRole.Admin,
                color: "#f9acbf",
                user: {
                    id: "VXNlcjo2MDUwYjUxYTZmN2FiZjIxMjA2NTI4MzY=",
                    displayName: "Awesome user",
                    username: "testuser",
                    email: "test@test.com",
                },
            },
            {
                "id": "VHJpcE1lbWJlcjoxYjk2MmNmNS02NmMxLTQ3NDUtOWU2MC1jZGRmOWYyOTIwYjI=",
                role: TripUserRole.Member,
                color: "#fff1a5",
                user: {
                    id:
                        "VXNlcjphZjY2NWJhMi1kZTU3LTRjNmEtYWI4ZS02NjkyN2M1Y2FjYWM=",
                    displayName: "Cool user",
                    username: "testuser2",
                    email: "test@test.com",
                },
            },
        ],
    }];
    return (
        <>
            <ScreenHeader screenTitle={t("screen_header_trip_dashBoard")} />
            <Text h3 style={styles.headlines}>Current Journeys</Text>
            {mockedTrips.map((trip) => {
                return <TripCard trip={trip} openTripDetails={openTripDetails} />
            })}
            <Text h3 style={styles.headlines}>Past Journeys</Text>
        </>
    );
}

const styles = StyleSheet.create({
    headlines: {
        textAlign: "center",
    }
});
