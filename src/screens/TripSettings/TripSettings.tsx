import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import TripTabParamList from "../../types/TripTabParamList";

type TripItineraryScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TripTabParamList, Routes.TRIP_SETTINGS>,
    StackNavigationProp<RootStackParamList, Routes.ITINERARY>
>;

type TripItineraryRouteProp = RouteProp<TripTabParamList, Routes.TRIP_SETTINGS>;

type Props = {
    navigation: TripItineraryScreenNavigationProp;
    route: TripItineraryRouteProp;
};

const TripSettings = (props: Props): JSX.Element => {
    return <Text>{props.route.params.tripId}</Text>;
};

export default TripSettings;
