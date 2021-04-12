import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
import i18n from "./src/services/i18n";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Register from "./src/screens/Register";
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { getEnvironment } from "./src/get-environment";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
//init i18n
i18n;
const Stack = createStackNavigator();

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};
// Initialize Apollo Client (Backend)
const httpLink = createHttpLink({
	uri: getEnvironment()?.backendUrl,
});

const authLink = setContext(async (_, { headers }) => {
	// get the authentication token from secure storage if it exists
	const token = await SecureStore.getItemAsync("accessToken");

	if (token) {
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	} else {
		return {
			headers: {
				...headers,
			},
		};
	}
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default function App() {
    const { t } = useTranslation();
    return (
		<ApolloProvider client={client}>
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
		</ApolloProvider>
    );
}
