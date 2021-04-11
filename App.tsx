import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
import i18n from "./src/services/i18n";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Register from "./src/screens/Register";

//init i18n
i18n;
const Stack = createStackNavigator();

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

export default function App() {
    const { t } = useTranslation();
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="login">
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
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
