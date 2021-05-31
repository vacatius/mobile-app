import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { theme } from "../theme/theme";
import * as Types from "./../types.d";
import ActivityCard from "./ActivityCard/ActivityCard";
import ActivityGroupHeader from "./ActivityGroupHeader";
export type ActivityGroupData = {
    id: string;
    latitude?: Types.Maybe<number>;
    longitude?: Types.Maybe<number>;
    name?: Types.Maybe<string>;
    description?: Types.Maybe<string>;
    previousTripRoutePoint?: Types.Maybe<{ name?: Types.Maybe<string> }>;
    nextTripRoutePoint?: Types.Maybe<{ name?: Types.Maybe<string> }>;
    activities: Array<{
        id: string;
        name: string;
        description?: Types.Maybe<string>;
        startDate?: Types.Maybe<string>;
        endDate?: Types.Maybe<string>;
        routePoint: { id: string; name?: Types.Maybe<string> };
        addedByUser: { id: string; username: string; displayName: string };
        activityReactions: Array<{
            id: string;
            activityReactionType: Types.ActivityReactionType;
            addedByUser: { id: string };
        }>;
    }>;
};
export interface ActivityGroupProps {
    activityGroupData: ActivityGroupData;
    tripId: string;
    position: number;
    onEditActivityGroup: (data: ActivityGroupData) => void;
    onAddActivity: (tripId: string, activityGroupId: string) => void;
}

export default function ActivityGroup(props: ActivityGroupProps): JSX.Element {
    const [isOpen, setOpen] = useState(props.position === 0);
    const { t } = useTranslation();

    const onEdit = (): void => {
        console.log("edit activity group");
        props.onEditActivityGroup(props.activityGroupData);
    };

    const onAddActivity = (): void => {
        props.onAddActivity(props.tripId, props.activityGroupData.id);
    };

    return (
        <View style={styles.activityGroup}>
            <ActivityGroupHeader
                title={props.activityGroupData.name || "Activity"}
                onEdit={onEdit}
                onAdd={onAddActivity}
                onOpen={() => setOpen(!isOpen)}
                isOpen={isOpen}
            />
            <View
                style={
                    isOpen
                        ? styles.activity
                        : {
                              ...styles.activity,
                              ...{ padding: 0 },
                          }
                }
            >
                {isOpen &&
                    props.activityGroupData.activities.map((a) => (
                        <ActivityCard
                            key={a.id}
                            tripId={props.tripId}
                            id={a.id}
                            date={a.startDate}
                            activityReactions={a.activityReactions}
                            name={a.name}
                        />
                    ))}
                {isOpen && props.activityGroupData.activities.length === 0 && (
                    <Text style={theme.fonts.label.style}>{t("screens.itinerary.noActivity")}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    activityGroup: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#444",
        marginBottom: 10,
    },
    activity: {
        padding: 10,
        paddingBottom: 0,
    },
});
