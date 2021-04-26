import {
    NavigationContainer,
    NavigationContainerRef,
    StackActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ApolloConnection from "./src/components/ApolloConnection/ApolloConnection";
import SvgLogo from "./src/components/SvgLogo";
import useCurrentAuthUser from "./src/hooks/useCurrentAuthUser";
import AddEditActivityGroupScreen from "./src/screens/AddEditActivityGroup/AddEditActivityGroupScreen";
import { AddTrip } from "./src/screens/AddTrip/AddTrip";
import TripItinerary from "./src/screens/Itinerary/TripItinerary";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import ShareTrip from "./src/screens/ShareTrip/ShareTrip";
import TripsDashboard from "./src/screens/TripsDashboard/TripsDashboard";
import i18n from "./src/services/i18n";
import { TripRoutePoint } from "./src/types";
import { Routes } from "./src/types/Routes";
//init i18n
i18n;
const Stack = createStackNavigator();

export default function App(): JSX.Element {
    const { t } = useTranslation();
    const navigationRef = useRef<NavigationContainerRef>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const replace = (name: string, params: any): void => {
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    };
    const { getCurrentUser } = useCurrentAuthUser();
    const [initialRoute, setInitialRoute] = useState("");

    useEffect(() => {
        async function loadInitialRoute(): Promise<void> {
            const result = await getCurrentUser();
            const route = result != null ? Routes.DASHBOARD : Routes.LOGIN;
            console.log("Initial route? " + route);
            setInitialRoute(route);
        }

        loadInitialRoute();
    }, []);
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            {(initialRoute === "" && <SvgLogo />) || (
                <NavigationContainer ref={navigationRef}>
                    <ApolloConnection navigationFn={replace}>
                        <Stack.Navigator initialRouteName={initialRoute}>
                            <Stack.Screen
                                name={Routes.LOGIN}
                                component={Login}
                                options={{ title: t("login") }}
                            />
                            <Stack.Screen
                                name={Routes.REGISTER}
                                component={Register}
                                options={{ title: t("register") }}
                            />
                            <Stack.Screen
                                name={Routes.DASHBOARD}
                                component={TripsDashboard}
                                options={{
                                    title: t("screens.dashboard.title"),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.ITINERARY}
                                component={TripItinerary}
                                options={({ route }) => {
                                    const params = route.params as {
                                        tripName: string;
                                    };
                                    return {
                                        title: params.tripName,
                                    };
                                }}
                            />
                            <Stack.Screen
                                name={Routes.ADD_TRIP}
                                component={AddTrip}
                                options={{
                                    title: t("screens.add_trip.title"),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.SHARE_TRIP}
                                component={ShareTrip}
                                options={{
                                    title: t("screens.shareTrip.title"),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.ADD_EDIT_ACTIVITY_GROUP}
                                component={AddEditActivityGroupScreen}
                                options={({ route }) => {
                                    const params = route.params as {
                                        tripRoutePointToEdit: TripRoutePoint;
                                    };
                                    return {
                                        title:
                                            params.tripRoutePointToEdit ===
                                            undefined
                                                ? t(
                                                      "screens.addEditActivityGroup.titleCreate"
                                                  )
                                                : t(
                                                      "screens.addEditActivityGroup.titleUpdate"
                                                  ),
                                    };
                                }}
                            />
                        </Stack.Navigator>
                    </ApolloConnection>
                </NavigationContainer>
            )}
        </SafeAreaProvider>
    );
}
