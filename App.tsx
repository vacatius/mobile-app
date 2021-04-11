import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useTranslation } from "react-i18next";
import i18n from "./src/services/i18n";
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { getEnvironment } from "./src/get-environment";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const initI18n = i18n;

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
	const { t, i18n } = useTranslation();
	return (
		<ApolloProvider client={client}>
			<View style={styles.container}>
				<Text>{t("hello_world")}</Text>
				<Icon
					reverse
					name="beer"
					type="font-awesome-5"
					color="#f50"
					onPress={() => i18n.changeLanguage("en")}
				/>
				<StatusBar style="auto" />
			</View>
		</ApolloProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
