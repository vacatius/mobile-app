import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from "../../components/ActivityCard";
import RootStackParamList from "../../types/RootStackParamList";
import { useGetTripQuery } from "./types/getTripQuery";

type TripItineraryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TripItinerary"
>;

type TripItineraryRouteProp = RouteProp<RootStackParamList, "TripItinerary">;

type Props = {
    navigation: TripItineraryScreenNavigationProp;
    route: TripItineraryRouteProp;
};

export default function TripItinerary(props: Props) {
    const { data, error, loading } = useGetTripQuery({
        variables: { tripId: props.route.params.tripId },
    });

    if (data?.node?.__typename === "Trip") {
        return (
            <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
                <SafeAreaView style={styles.container}>
                    {loading && <Text>loading...</Text>}
                    {data.node.itinerary.map((i) => (
                        <>
                            <Text key={i.id}>{i.name}</Text>
                            {i.activities.map((a) => {
                                <ActivityCard
                                    key={a.id}
                                    date={a.startDate}
                                    dislikes={2}
                                    likes={3}
                                    name={a.name}
                                />;
                            })}
                            <ActivityCard
                                date="2019-12-03T09:54:33Z"
                                dislikes={2}
                                likes={100}
                                name="Hardcoded Card with very long test text, very long"
                            />
                        </>
                    ))}
                </SafeAreaView>
            </ScrollView>
        );
    } else {
        return <></>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
});
