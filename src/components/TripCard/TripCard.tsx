import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Icon, Text } from "react-native-elements";
import { TripsQuery } from "../../screens/TripsDashboard/types/trip-dashboard.query";
import AvatarList from "./AvatarList";

export interface TripCardProps {
    trip: TripsQuery["trips"][0];
    openTripDetails: (trip: TripsQuery["trips"][0]) => void;
}

const TripCard: React.FC<TripCardProps> = (props: TripCardProps) => (
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
                        {!props.trip.startDate && !props.trip.endDate && (
                            <View>
                                <Text h4>No date.</Text>
                            </View>
                        )}
                        {props.trip.startDate && (
                            <View>
                                <Text>
                                    {new Date(
                                        props.trip.startDate
                                    ).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                        {props.trip.startDate && (
                            <View>
                                <Text>
                                    {" "}
                                    -
                                    {new Date(
                                        props.trip.endDate
                                    ).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                    </Card.FeaturedTitle>
                    <AvatarList tripMembers={props.trip.members} />
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

export default TripCard;

const styles = StyleSheet.create({
    tripCard: {
        borderColor: "grey",
        borderRadius: 3,
        margin: 0,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
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
