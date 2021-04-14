import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { TripUserRole } from "../../types.d";
import AvatarList from "./AvatarList";
import { TripsQuery } from "./types/trip-dashboard.query";

export interface TripCardProps {
    trip: TripsQuery["trips"][0];
    openTripDetails: (trip: TripsQuery["trips"][0]) => void;
}

const TripCard: React.FC<TripCardProps> = (props: TripCardProps) => {
    const mockedMembers = [
        // TODO - Remove once real data is available
        {
            id:
                "VHJpcE1lbWJlcjpiOGQyYjM2Mi0yY2JmLTRhYmUtOTQwMS1lY2M0ODMxODhhYTA=",
            role: TripUserRole.Admin,
            color: "#f9acbf",
            user: {
                id: "VXNlcjo2MDUwYjUxYTZmN2FiZjIxMjA2NTI4MzY=",
                displayName: "Don",
                username: "testuser",
                email: "test@test.com",
            },
        },
        {
            id:
                "VHJpcE1lbWJlcjoxYjk2MmNmNS02NmMxLTQ3NDUtOWU2MC1jZGRmOWYyOTIwYjI=",
            role: TripUserRole.Member,
            color: "#fff1a5",
            user: {
                id: "VXNlcjphZjY2NWJhMi1kZTU3LTRjNmEtYWI4ZS02NjkyN2M1Y2FjYWM=",
                displayName: "Wild",
                username: "testuser2",
                email: "test@test.com",
            },
        },
    ];
    return (
        <Pressable
            onPress={() => {
                props.openTripDetails(props.trip);
            }}
        >
            <Card containerStyle={styles.tripCard}>
                <Card.Title h4 style={styles.tripCardTitle}>
                    {props.trip.name}
                </Card.Title>
                <Card.Divider />

                <View style={styles.tripCardContent}>
                    <View style={styles.tripCardLeftContent}>
                        <Card.FeaturedTitle style={styles.tripCardDate}>
                            {new Date(
                                props.trip.startDate
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(props.trip.endDate).toLocaleDateString()}
                        </Card.FeaturedTitle>
                        <AvatarList tripMembers={mockedMembers} />
                    </View>
                    <Icon
                        size={64}
                        name="calendar"
                        type="material-community"
                        style={styles.tripCardIcon}
                    />
                </View>
            </Card>
        </Pressable>
    );
};
export default TripCard;

const styles = StyleSheet.create({
    tripCard: {
        borderColor: "black",
        borderRadius: 5,
    },
    tripCardTitle: {
        color: "black",
        textAlign: "left",
    },
    tripCardDate: {
        color: "black",
        fontWeight: "500",
    },
    tripCardContent: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tripCardIcon: {
        flexBasis: 100,
        alignSelf: "center",
        justifyContent: "center",
    },
    tripCardLeftContent: {
        flexBasis: "auto",
        flexGrow: 1,
    },
});
