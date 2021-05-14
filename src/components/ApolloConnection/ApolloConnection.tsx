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
import { loginMutation } from "./login.mutation";

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
    const getNewToken = async (): Promise<string> => {
        console.log("get new token");

        const password = await SecureStore.getItemAsync(
            SecureStorageItems.PASSWORD
        );
        const username = await SecureStore.getItemAsync(
            SecureStorageItems.USERNAME
        );
        console.log("fetch token with credentials");
        if (password === null || username === null) {
            throw new Error("no credentials stored");
        }
        return client
            .mutate({
                mutation: loginMutation,
                variables: {
                    input: { password: password, username: username },
                },
                errorPolicy: "all",
            })
            .then((response) => {
                // extract your accessToken from your response data and return it

                const token = response.data?.login?.token;

                if (!token) {
                    throw new Error(
                        "could not get a new token with credentials"
                    );
                }
                return token;
            });
    };

    // https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8
    const errorLink: ApolloLink = onError(
        ({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                for (const err of graphQLErrors) {
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
                                                "Got a new access token using credentials"
                                            );
                                            await SecureStore.setItemAsync(
                                                SecureStorageItems.ACCESS_TOKEN,
                                                accessToken
                                            );
                                            resolvePendingRequests();

                                            const context =
                                                operation.setContext({
                                                    headers: {
                                                        authorization: `Bearer ${accessToken}`,
                                                    },
                                                });
                                            console.log("context start");
                                            console.log(context);
                                            console.log("context end");

                                            return forward(operation);
                                        })
                                        .catch(async (error) => {
                                            console.log(err.message);
                                            Toast.show({
                                                text1: t("error.generic"),
                                                text2: err.message,
                                                type: "error",
                                            });
                                            console.error(error);
                                            pendingRequests = [];
                                            // Handle token refresh errors e.g clear stored tokens, redirect to login
                                            await SecureStore.deleteItemAsync(
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
                            console.log(err.message);
                            Toast.show({
                                text1: t("error.generic"),
                                text2: err.message,
                                type: "error",
                            });
                            break;
                    }
                }
            }
            if (networkError) {
                Toast.show({
                    text1: t("error.network"),
                    text2: networkError.message,
                    type: "error",
                });
            }
        }
    );

    const authLink = setContext(async (_, { headers }) => {
        // get the authentication token from secure storage if it exists
        const token = await SecureStore.getItemAsync(
            SecureStorageItems.ACCESS_TOKEN
        );
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
