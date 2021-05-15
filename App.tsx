/* eslint-disable react/display-name */
import {
    NavigationContainer,
    NavigationContainerRef,
    StackActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ApolloConnection from "./src/components/ApolloConnection/ApolloConnection";
import ScreenHeader from "./src/components/ScreenHeader";
import SvgLogo from "./src/components/SvgLogo";
import useCurrentAuthUser from "./src/hooks/useCurrentAuthUser";
import TripTabs from "./src/routes/TripTabs";
import AddEditActivityGroupScreen from "./src/screens/AddEditActivityGroup/AddEditActivityGroupScreen";
import { AddTrip } from "./src/screens/AddTrip/AddTrip";
import Login from "./src/screens/Login/Login";
import { LoginMutation } from "./src/screens/Login/types/loginMutation";
import Profile from "./src/screens/Profile/Profile";
import Register from "./src/screens/Register/Register";
import ShareTrip from "./src/screens/ShareTrip/ShareTrip";
import TripsDashboard from "./src/screens/TripsDashboard/TripsDashboard";
import ViewAddEditActivity from "./src/screens/ViewAddEditActivity/ViewAddEditActivity";
import i18n from "./src/services/i18n";
import { TripRoutePoint } from "./src/types";
import RootStackParamList from "./src/types/RootStackParamList";
import { Routes } from "./src/types/Routes";
import * as Linking from "expo-linking";
//init i18n
i18n;
const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
    const { t } = useTranslation();
    const navigationRef = useRef<NavigationContainerRef>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const replace = (name: string, params: any): void => {
        navigationRef.current?.dispatch(StackActions.replace(name, params));
    };
    const { getCurrentUser } = useCurrentAuthUser();
    const [initialRoute, setInitialRoute] = useState<Routes>(Routes.EMPTY);
    const [user, setUser] = useState<LoginMutation["login"]["user"] | undefined>();

    useEffect(() => {
        async function loadInitialRoute(): Promise<void> {
            const result = await getCurrentUser();
            setUser(result);
            const route = result != null ? Routes.DASHBOARD : Routes.LOGIN;
            console.log("Initial route? " + route);
            setInitialRoute(route);
        }

        loadInitialRoute();
    }, []);

    const prefix = Linking.createURL("/");
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                ShareTrip: "joinTrip/:invitationId",
            },
        },
    };

    return (
        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="white" />
            {(initialRoute === Routes.EMPTY && <SvgLogo />) || (
                <NavigationContainer ref={navigationRef} linking={linking}>
                    <ApolloConnection navigationFn={replace}>
                        <Stack.Navigator
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            initialRouteName={initialRoute}
                        >
                            <Stack.Screen
                                name={Routes.LOGIN}
                                component={Login}
                                initialParams={{ updateUser: setUser }}
                                options={{
                                    headerBackTitleVisible: false,
                                    headerTitle: (props) => (
                                        <ScreenHeader screenTitle={t("login")} {...props} />
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.REGISTER}
                                component={Register}
                                options={{
                                    headerBackTitleVisible: false,
                                    headerTitle: (props) => (
                                        <ScreenHeader screenTitle={t("register")} {...props} />
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.DASHBOARD}
                                component={TripsDashboard}
                                options={{
                                    headerBackTitleVisible: false,
                                    headerTitle: (props) => (
                                        <ScreenHeader
                                            screenTitle={t("screens.dashboard.title")}
                                            user={user}
                                            {...props}
                                        />
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.ITINERARY}
                                component={TripTabs}
                                //options set in screen
                            />
                            <Stack.Screen
                                name={Routes.ADD_TRIP}
                                component={AddTrip}
                                options={{
                                    headerBackTitleVisible: false,
                                    headerTitle: (props) => (
                                        <ScreenHeader
                                            screenTitle={t("screens.add_trip.title")}
                                            {...props}
                                        />
                                    ),
                                }}
                            />
                            <Stack.Screen
                                name={Routes.SHARE_TRIP}
                                component={ShareTrip}
                                options={({ route }) => {
                                    const params = route.params as unknown as {
                                        tripId: string;
                                    };
                                    return {
                                        headerBackTitleVisible: false,
                                        headerTitle: (props) => (
                                            <ScreenHeader
                                                screenTitle={
                                                    params.tripId === undefined
                                                        ? t("screens.shareTrip.titleJoin")
                                                        : t("screens.shareTrip.titleShare")
                                                }
                                                {...props}
                                            />
                                        ),
                                    };
                                }}
                            />
                            <Stack.Screen
                                name={Routes.ADD_EDIT_ACTIVITY_GROUP}
                                component={AddEditActivityGroupScreen}
                                options={({ route }) => {
                                    const params = route.params as unknown as {
                                        tripRoutePointToEdit: TripRoutePoint;
                                    };
                                    return {
                                        headerBackTitleVisible: false,
                                        headerTitle: (props) => (
                                            <ScreenHeader
                                                screenTitle={
                                                    params.tripRoutePointToEdit === undefined
                                                        ? t(
                                                              "screens.addEditActivityGroup.titleCreate"
                                                          )
                                                        : t(
                                                              "screens.addEditActivityGroup.titleUpdate"
                                                          )
                                                }
                                                {...props}
                                            />
                                        ),
                                    };
                                }}
                            />
                            <Stack.Screen
                                name={Routes.VIEW_ADD_EDIT_ACTIVITY}
                                component={ViewAddEditActivity}
                                options={({ route }) => {
                                    const params = route.params as {
                                        activityName?: string;
                                    };
                                    return {
                                        title:
                                            params.activityName === undefined
                                                ? t("screens.addEditActivityGroup.titleCreate")
                                                : t("screens.addEditActivityGroup.titleUpdate"),
                                    };
                                }}
                            />
                            <Stack.Screen
                                name={Routes.PROFILE}
                                component={Profile}
                                initialParams={{ updateUser: setUser }}
                                options={{
                                    headerBackTitleVisible: false,
                                    headerTitle: (props) => (
                                        <ScreenHeader
                                            screenTitle={user?.username || ""}
                                            {...props}
                                        />
                                    ),
                                }}
                            />
                        </Stack.Navigator>
                    </ApolloConnection>
                </NavigationContainer>
            )}
            <Toast
                ref={(ref) => Toast.setRef(ref)}
                topOffset={80}
                style={{
                    height: 50,
                }}
            />
        </SafeAreaProvider>
    );
}
