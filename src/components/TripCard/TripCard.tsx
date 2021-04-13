import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Trip } from "../../types";
import AvatarList from "./AvatarList";

export interface TripCardProps {
    // TODO
    trip?: Trip;
}

const TripCard: React.FC<TripCardProps> = (props: TripCardProps) => {
    return (
        <Card containerStyle={styles.tripCard}>
            <Card.Title h4 style={styles.tripCardTitle}>
                Berlin 05/21
            </Card.Title>
            <Card.Divider />
            <Card.FeaturedTitle style={styles.tripCardDate}>
                02.05.2021 - 10.05.2021
            </Card.FeaturedTitle>
            <AvatarList />
        </Card>
    );
};
export default TripCard;

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: "red",
        borderWidth: 2,
    },
    tripCard: {
        borderColor: "black",
    },
    tripCardTitle: {
        color: "black",
        textAlign: "left",
    },
    tripCardDate: {
        color: "black",
        fontWeight: "500",
    },
    tripCardInfo: {
        color: "black",
    },
});
