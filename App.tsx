import React, { useRef } from "react";
import {
    NavigationContainer,
    NavigationContainerRef,
    StackActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ApolloConnection from "./src/components/ApolloConnection";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import TripsDashboard from "./src/screens/TripsDashboard/TripsDashboard";
import i18n from "./src/services/i18n";
//init i18n
i18n;
const Stack = createStackNavigator();

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
};

export default function App() {
    const { t } = useTranslation();
    const navigationRef = useRef<NavigationContainerRef>(null);
    const replace = (name: string, params: any) => {
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    };
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            <NavigationContainer ref={navigationRef}>
                <ApolloConnection navigationFn={replace}>
                    <Stack.Navigator initialRouteName="Dashboard">
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
