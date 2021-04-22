import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Types from "./../types.d";
import ActivityCard from "./ActivityCard/ActivityCard";
import ActivityGroupHeader from "./ActivityGroupHeader";

export interface ActivityGroupProps {
    activityGroupData: {
        id: string;
        latitude?: Types.Maybe<number>;
        longitude?: Types.Maybe<number>;
        name?: Types.Maybe<string>;
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
    tripId: string;
}

export default function ActivityGroup(props: ActivityGroupProps) {
    const [isOpen, setOpen] = useState(false);

    const onEdit = () => {
        // TODO execute properly
        console.log("edit");
    };

    const onAdd = () => {
        // TODO execute properly
        console.log("add");
    };

    return (
        <View style={styles.activityGroup}>
            <ActivityGroupHeader
                title={props.activityGroupData.name || "Activity"}
                onEdit={onEdit}
                onAdd={onAdd}
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
        backgroundColor: "yellow",
    },
    activity: {
        padding: 10,
        paddingBottom: 0,
    },
});
