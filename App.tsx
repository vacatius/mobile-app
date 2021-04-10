import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
import i18n from "./src/services/i18n";

//init i18n
i18n;

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            <ScrollView keyboardShouldPersistTaps="handled">
                <Login></Login>
            </ScrollView>
        </SafeAreaProvider>
    );
}
