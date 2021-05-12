import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import ScreenHeader from "../components/ScreenHeader";
import TripItinerary from "../screens/Itinerary/TripItinerary";
import TripSettings, { Mode } from "../screens/TripSettings/TripSettings";
import RootStackParamList from "../types/RootStackParamList";
import { Routes } from "../types/Routes";
import TripTabParamList from "../types/TripTabParamList";
import TripHeaderContext from "./TripHeaderContext";

const Tab = createBottomTabNavigator<TripTabParamList>();

type TripTabsScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.DASHBOARD>;
type TripTabsRouteProp = RouteProp<TripTabParamList, "TripTabsNavigation">;

type TripTabsProps = {
    navigation: TripTabsScreenNavigationProp;
    route: TripTabsRouteProp;
};
const TripTabs = (props: TripTabsProps): JSX.Element => {
    const [currentScreen, setCurrentScreen] = useState<Routes>(Routes.ITINERARY);
    const [settingsMode, setSettingsMode] = useState<Mode>(Mode.VIEW);
    const [title, setTitle] = useState(props.route.params.params.tripName);

    useEffect(() => {
        props.navigation.setOptions({
            headerBackTitleVisible: false,
            // eslint-disable-next-line react/display-name
            headerTitle: (headerProps) => (
                <ScreenHeader
                    // eslint-disable-next-line react/prop-types
                    screenTitle={title}
                    actionIcon={
                        settingsMode === Mode.VIEW || currentScreen === Routes.ITINERARY ? (
                            <Icon
                                style={styles.iconButton}
                                name={currentScreen === Routes.ITINERARY ? "share" : "pen"}
                                size={20}
                                color="#222"
                                type="font-awesome-5"
                            />
                        ) : undefined
                    }
                    actionCallback={() =>
                        currentScreen === Routes.ITINERARY
                            ? console.log("share trip")
                            : setSettingsMode(Mode.EDIT)
                    }
                    {...headerProps}
                />
            ),
        });
    }, [currentScreen, title, settingsMode]);

    return (
        <TripHeaderContext.Provider
            value={{
                settingsMode: settingsMode,
                setSettingsMode: setSettingsMode,
                title: title,
                setTitle: setTitle,
            }}
        >
            <Tab.Navigator
                screenOptions={({ route }) => {
                    return {
                        /* eslint-disable react/prop-types */
                        tabBarIcon: function TabBarIcon({ color, size }) {
                            return (
                                <Pressable
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    onPress={() => {
                                        if (route.name === Routes.ITINERARY) {
                                            setCurrentScreen(Routes.ITINERARY);
                                            setSettingsMode(Mode.VIEW);
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
                                >
                                    <Icon
                                        name={route.name === Routes.ITINERARY ? "suitcase" : "cog"}
                                        type="font-awesome-5"
                                        size={size}
                                        color={color}
                                    />
                                </Pressable>
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
                    initialParams={{
                        tripId: props.route.params.params.tripId,
                    }}
                />
            </Tab.Navigator>
        </TripHeaderContext.Provider>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        marginLeft: 10,
    },
});

export default TripTabs;
