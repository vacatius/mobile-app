import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Icon } from "react-native-elements";
import TripItinerary from "../screens/Itinerary/TripItinerary";
import TripSettings from "../screens/TripSettings/TripSettings";
import { Routes } from "../types/Routes";
import TripTabParamList from "../types/TripTabParamList";

const Tab = createBottomTabNavigator<TripTabParamList>();

type TripTabsRouteProp = RouteProp<TripTabParamList, "TripTabsNavigation">;

type TripTabsProps = {
    route: TripTabsRouteProp;
};
const TripTabs = (props: TripTabsProps): JSX.Element => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    /* eslint-disable react/prop-types */
                    tabBarIcon: function TabBarIcon({ color, size }) {
                        // You can return any component that you like here!
                        return (
                            <Icon
                                name={
                                    route.name === Routes.ITINERARY
                                        ? "suitcase"
                                        : "cog"
                                }
                                type="font-awesome-5"
                                size={size}
                                color={color}
                            />
                        );
                    },
                };
            }}
            tabBarOptions={{
                activeTintColor: "#BCE1B0",
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name={Routes.ITINERARY} component={TripItinerary} />
            <Tab.Screen
                name={Routes.TRIP_SETTINGS}
                component={TripSettings}
                initialParams={{ tripId: props.route.params.params.tripId }}
            />
        </Tab.Navigator>
    );
};

export default TripTabs;
