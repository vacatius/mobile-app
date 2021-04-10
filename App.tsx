import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";

export default function App() {
    return (
        <SafeAreaProvider>
            <Login></Login>
            <StatusBar style="auto" />
        </SafeAreaProvider>
    );
}
