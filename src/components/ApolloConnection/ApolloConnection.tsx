import React from "react";
import {
    ApolloClient,
    ApolloProvider,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
    fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getEnvironment } from "../../get-environment";
import * as SecureStore from "expo-secure-store";
import { onError } from "@apollo/client/link/error";
import { useNavigation } from "@react-navigation/native";
import { SecureStorageItems } from "../../../App";
import { REFRESH_TOKEN_MUTATION } from "./refresh-token.mutation";
export type Props = {
    children: JSX.Element;
    navigationFn: (name: string, params: any) => void;
};
export default function ApolloConnection(props: Props) {
    // Initialize Apollo Client (Backend)
    let isRefreshing = false;
    let pendingRequests: any[] = [];

    const resolvePendingRequests = () => {
        pendingRequests.map((callback) => callback());
        pendingRequests = [];
    };

    const httpLink = createHttpLink({
        uri: getEnvironment()?.backendUrl,
        credentials: "include",
    });
    const getNewToken = () => {
        return client
            .mutate({ mutation: REFRESH_TOKEN_MUTATION })
            .then((response) => {
                // extract your accessToken from your response data and return it
                const data = response.data?.refreshToken;
                if (!data) {
                    throw new Error("could not get a refresh token");
                }
                return data?.token;
            });
    };

    // https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8
    const errorLink: ApolloLink = onError(
        ({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    console.error(err);
                    switch (err.extensions?.code) {
                        case "UNAUTHENTICATED":
                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                            console.log(
                                "Acess Token no longer valid, trying to refresh"
                            );
                            let forward$;

                            if (!isRefreshing) {
                                isRefreshing = true;
                                forward$ = fromPromise(
                                    getNewToken()
                                        .then(async (accessToken) => {
                                            console.log(
                                                "Got a new access token using refresh token"
                                            );
                                            await SecureStore.setItemAsync(
                                                SecureStorageItems.ACCESS_TOKEN,
                                                accessToken
                                            );
                                            resolvePendingRequests();
                                   
                                            // retry the request, returning the new observable
                                            return accessToken;
                                        })
                                        .catch((error) => {
                                            pendingRequests = [];
                                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                                            SecureStore.deleteItemAsync(
                                                SecureStorageItems.ACCESS_TOKEN
                                            );
                                            props.navigationFn("Login", {});
                                            return;
                                        })
                                        .finally(() => {
                                            isRefreshing = false;
                                        })
                                );
                            } else {
                                // Will only emit once the Promise is resolved
                                forward$ = fromPromise(
                                    new Promise<void>((resolve) => {
                                        pendingRequests.push(() => resolve());
                                    })
                                );
                            }

                            return forward$.flatMap(() => forward(operation));
                    }
                }
            }
        }
    );

    const authLink = setContext(async (_, { headers }) => {
        // get the authentication token from secure storage if it exists
        // const token = await SecureStore.getItemAsync("accessToken");
        const token = "aifjaofcdf";
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
        credentials: "include",
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
