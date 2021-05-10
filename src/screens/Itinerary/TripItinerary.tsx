import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityGroup, { ActivityGroupData } from "../../components/ActivityGroup";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { Mode } from "../ViewAddEditActivity/ViewAddEditActivity";
import TripTabParamList from "../../types/TripTabParamList";
import { useGetTripQuery } from "./types/getTripQuery";

type TripItineraryScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TripTabParamList, Routes.ITINERARY>,
    StackNavigationProp<RootStackParamList, Routes.ITINERARY>
>;

type TripItineraryRouteProp = RouteProp<TripTabParamList, Routes.ITINERARY>;

type Props = {
    navigation: TripItineraryScreenNavigationProp;
    route: TripItineraryRouteProp;
};

export default function TripItinerary(props: Props): JSX.Element {
    const { t } = useTranslation();

    const { data, loading } = useGetTripQuery({
        variables: { tripId: props.route.params.tripId },
    });
    const onEditActivityGroup = (data?: ActivityGroupData): void => {
        let routeOpts: RootStackParamList["AddEditActivityGroup"] = {
            tripId: props.route.params.tripId,
        };
        if (data !== undefined) {
            routeOpts = {
                ...routeOpts,
                tripRoutePointToEdit: data,
            };
        }
        props.navigation.navigate(Routes.ADD_EDIT_ACTIVITY_GROUP, routeOpts);
        console.log("Add activity group button pressed");
    };

    const onAddActivity = (tripId: string, activityGroupId: string): void => {
        props.navigation.navigate(Routes.VIEW_ADD_EDIT_ACTIVITY, {
            tripId: tripId,
            activityGroupId: activityGroupId,
            mode: Mode.ADD,
        });
    };

    if (data?.node?.__typename === "Trip") {
        return (
            <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
                <SafeAreaView style={styles.container}>
                    {loading && <Text>{t("loading")}</Text>}
                    <Text numberOfLines={2} style={styles.descriptionText}>
                        {data.node.description}
                    </Text>
                    <Button
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonLogin}
                        title={t("screens.itinerary.add")}
                        titleStyle={{ color: "black", fontSize: 25 }}
                        icon={
                            <Icon
                                style={styles.iconButton}
                                name="plus"
                                size={25}
                                color="black"
                                type="font-awesome-5"
                            />
                        }
                        iconRight
                        onPress={() => onEditActivityGroup()}
                    />
                    {data.node.itinerary.map((i, position) => (
                        <ActivityGroup
                            key={i.id}
                            position={position}
                            activityGroupData={i}
                            tripId={props.route.params.tripId}
                            onEditActivityGroup={onEditActivityGroup}
                            onAddActivity={onAddActivity}
                        />
                    ))}
                </SafeAreaView>
            </ScrollView>
        );
    } else if (loading) {
        return <ActivityIndicator size="large" />;
    } else {
        return <Text>{t("error.generic")}</Text>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
    iconButton: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    buttonLogin: {
        backgroundColor: "#BCE1B0",
    },
    descriptionText: {
        fontSize: 18,
        marginBottom: 20,
    },
});
