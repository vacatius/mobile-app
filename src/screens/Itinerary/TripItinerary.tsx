import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RootStackParamList from "../../types/RootStackParamList";

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
    return (
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <SafeAreaView style={styles.container}>
                <Text>{props.route.params.tripId}</Text>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
});
