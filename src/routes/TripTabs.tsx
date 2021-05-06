import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import ScreenHeader from "../components/ScreenHeader";
import TripItinerary from "../screens/Itinerary/TripItinerary";
import TripSettings from "../screens/TripSettings/TripSettings";
import RootStackParamList from "../types/RootStackParamList";
import { Routes } from "../types/Routes";
import TripTabParamList from "../types/TripTabParamList";

const Tab = createBottomTabNavigator<TripTabParamList>();

type TripTabsScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.DASHBOARD>;
type TripTabsRouteProp = RouteProp<TripTabParamList, "TripTabsNavigation">;

type TripTabsProps = {
    navigation: TripTabsScreenNavigationProp;
    route: TripTabsRouteProp;
};
const TripTabs = (props: TripTabsProps): JSX.Element => {
    const [currentScreen, setCurrentScreen] = useState<Routes>(Routes.ITINERARY);

    useEffect(() => {
        props.navigation.setOptions({
            headerBackTitleVisible: false,
            // eslint-disable-next-line react/display-name
            headerTitle: (headerProps) => (
                <ScreenHeader
                    // eslint-disable-next-line react/prop-types
                    screenTitle={props.route.params.params.tripName}
                    actionIcon={
                        <Icon
                            style={styles.iconButton}
                            name={currentScreen === Routes.ITINERARY ? "share" : "pen"}
                            size={20}
                            color="#222"
                            type="font-awesome-5"
                        />
                    }
                    actionCallback={() => console.log("share trip")}
                    {...headerProps}
                />
            ),
        });
    }, [currentScreen]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    /* eslint-disable react/prop-types */
                    tabBarIcon: function TabBarIcon({ color, size }) {
                        // You can return any component that you like here!
                        return (
                            <Icon
                                name={route.name === Routes.ITINERARY ? "suitcase" : "cog"}
                                type="font-awesome-5"
                                size={size}
                                color={color}
                                onPress={() => {
                                    if (route.name === Routes.ITINERARY) {
                                        setCurrentScreen(Routes.ITINERARY);
                                        props.navigation.navigate(Routes.ITINERARY, {
                                            screen: Routes.ITINERARY,
                                            params: {
                                                tripId: props.route.params.params.tripId,
                                                tripName: props.route.params.params.tripName,
                                            },
                                        });
                                    } else {
                                        setCurrentScreen(Routes.TRIP_SETTINGS);
                                        props.navigation.navigate(Routes.ITINERARY, {
                                            screen: Routes.TRIP_SETTINGS,
                                            params: {
                                                tripId: props.route.params.params.tripId,
                                            },
                                        });
                                    }
                                }}
                            />
                        );
                    },
                };
            }}
            tabBarOptions={{
                activeTintColor: "#007AFF",
                inactiveTintColor: "gray",
                showLabel: false,
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

const styles = StyleSheet.create({
    iconButton: {
        marginLeft: 10,
    },
});

export default TripTabs;
