import React from "react";
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getEnvironment } from "../get-environment";
import * as SecureStore from "expo-secure-store";

export type Props = {
    children: JSX.Element;
};
export default function ApolloConnection(props: Props) {
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
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
