import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityGroup from "../../components/ActivityGroup";
import RootStackParamList from "../../types/RootStackParamList";
import { useGetTripQuery } from "./types/getTripQuery";

type TripItineraryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "TripItinerary"
>;

type TripItineraryRouteProp = RouteProp<RootStackParamList, "TripItinerary">;

type Props = {
    navigation: TripItineraryScreenNavigationProp;
    route: TripItineraryRouteProp;
};

export default function TripItinerary(props: Props): JSX.Element {
    const { t } = useTranslation();

    const { data, error, loading } = useGetTripQuery({
        variables: { tripId: props.route.params.tripId },
    });

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
                        onPress={() => console.log("add group")}
                    />
                    {data.node.itinerary.map((i) => (
                        <ActivityGroup
                            key={i.id}
                            activityGroupData={i}
                            tripId={props.route.params.tripId}
                        />
                    ))}
                </SafeAreaView>
            </ScrollView>
        );
    } else {
        return <></>;
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
