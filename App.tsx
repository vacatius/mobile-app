import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Login from "./src/screens/Login";

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
