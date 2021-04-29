import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    fromPromise,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { getEnvironment } from "../../get-environment";
import SecureStorageItems from "../../types/SecureStorageItems";
import { REFRESH_TOKEN_MUTATION } from "./refresh-token.mutation";

export type Props = {
    children: JSX.Element;
    navigationFn: (name: string, params: Record<string, unknown>) => void;
};
export default function ApolloConnection(props: Props): JSX.Element {
    // Initialize Apollo Client (Backend)
    let isRefreshing = false;
    let pendingRequests: any[] = []; // eslint-disable-line

    const { t } = useTranslation();

    const resolvePendingRequests = (): void => {
        pendingRequests.map((callback) => callback());
        pendingRequests = [];
    };

    const httpLink = createHttpLink({
        uri: getEnvironment()?.backendUrl,
        credentials: "include",
    });
    const getNewToken = (): Promise<string> => {
        console.log("get new token");

        return client
            .mutate({ mutation: REFRESH_TOKEN_MUTATION, errorPolicy: "all" })
            .then((response) => {
                // extract your accessToken from your response data and return it

                console.log("fetch token");
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
                for (const err of graphQLErrors) {
                    console.error(err);
                    Toast.show({
                        text1: t("error.generic"),
                        text2: err.message,
                        type: "error",
                    });
                    switch (err.extensions?.code) {
                        case "UNAUTHENTICATED":
                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                            console.log(
                                "Acess Token no longer valid, trying to refresh"
                            );

                            if (!isRefreshing) {
                                isRefreshing = true;
                                fromPromise(
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
                                            return forward(operation);
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            pendingRequests = [];
                                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                                            SecureStore.deleteItemAsync(
                                                SecureStorageItems.ACCESS_TOKEN
                                            );
                                            props.navigationFn("Login", {});
                                        })
                                        .finally(() => {
                                            isRefreshing = false;
                                        })
                                );
                            } else {
                                // Will only emit once the Promise is resolved
                                fromPromise(
                                    new Promise<void>((resolve) => {
                                        pendingRequests.push(() => resolve());
                                    })
                                );
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            if (networkError) {
                Toast.show({
                    text1: t("error.generic"),
                    text2: networkError.message,
                    type: "error",
                });
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
        }
        return {
            headers: {
                ...headers,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(errorLink).concat(httpLink),
        cache: new InMemoryCache(),
        credentials: "include",
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
