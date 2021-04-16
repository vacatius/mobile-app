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
//init i18n
i18n;
const Stack = createStackNavigator();

export default function App() {
    const { t } = useTranslation();
    const navigationRef = useRef<NavigationContainerRef>(null);
    const replace = (name: string, params: any) => {
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    };
    const { getCurrentUser } = useCurrentAuthUser();
    const [initialRoute, setInitialRoute] = useState("Login");

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
                                title: t("screen_header_trip_dashBoard"),
                            }}
                        />
                    </Stack.Navigator>
                </ApolloConnection>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
function getCurrentUser() {
    throw new Error("Function not implemented.");
}
