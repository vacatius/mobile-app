import React, { useRef, useEffect, useState } from "react";
import {
    NavigationContainer,
    NavigationContainerRef,
    StackActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ApolloConnection from "./src/components/ApolloConnection/ApolloConnection";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import TripsDashboard from "./src/screens/TripsDashboard/TripsDashboard";
import i18n from "./src/services/i18n";
import useCurrentAuthUser from "./src/hooks/useCurrentAuthUser";
import SvgLogo from "./src/components/SvgLogo";
import { AddTrip } from "./src/screens/AddTrip/AddTrip";
//init i18n
i18n;
const Stack = createStackNavigator();

export default function App(): JSX.Element {
    const { t } = useTranslation();
    const navigationRef = useRef<NavigationContainerRef>(null);
    const replace = (name: string, params: any) => { //eslint-disable-line
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    };
    const { getCurrentUser } = useCurrentAuthUser();
    const [initialRoute, setInitialRoute] = useState("");

    useEffect(() => {
        async function loadInitalRoute() {
            const result = await getCurrentUser();
            const route = result != null ? "Dashboard" : "Login";
            console.log("Initial route? " + route);
            setInitialRoute(route);
        }
        loadInitalRoute();
    }, []);
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            {(initialRoute === "" && <SvgLogo></SvgLogo>) || (
                <NavigationContainer ref={navigationRef}>
                    <ApolloConnection navigationFn={replace}>
                        <Stack.Navigator initialRouteName={initialRoute}>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ title: t("login") }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ title: t("register") }}
                            />
                            <Stack.Screen
                                name="Dashboard"
                                component={TripsDashboard}
                                options={{
                                    title: t("screens.dashboard.title"),
                                }}
                            />
                            <Stack.Screen
                                name="AddTrip"
                                component={AddTrip}
                                options={{
                                    title: t("screens.add_trip.title"),
                                }}
                            />
                        </Stack.Navigator>
                    </ApolloConnection>
                </NavigationContainer>
            )}
        </SafeAreaProvider>
    );
}
