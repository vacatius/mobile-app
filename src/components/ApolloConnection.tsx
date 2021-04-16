import React from "react";
import {
    ApolloClient,
    ApolloProvider,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getEnvironment } from "../get-environment";
import * as SecureStore from "expo-secure-store";
import { onError } from "@apollo/client/link/error";
import { useNavigation } from '@react-navigation/native';

export type Props = {
    children: JSX.Element;
    navigationFn: (name: string, params: any) => void;
};
export default function ApolloConnection(props: Props) {
    // Initialize Apollo Client (Backend)
    const httpLink = createHttpLink({
        uri: getEnvironment()?.backendUrl,
    });

    const errorLink: ApolloLink = onError(
        ({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    console.error(err);
                    switch (err.extensions?.code) {
                        case "UNAUTHENTICATED":
                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                            console.log("Acess Token no longer valid");
                            SecureStore.deleteItemAsync("accessToken");
                            props.navigationFn("Login", {});
                            return;
                    }
                }
            }
        }
    );

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
        link: authLink.concat(errorLink).concat(httpLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
