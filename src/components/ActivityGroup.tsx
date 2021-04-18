import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Types from "../types";
import ActivityCard from "./ActivityCard";
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
        }>;
    };
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
            <View style={styles.activity}>
                {isOpen &&
                    props.activityGroupData.activities.map((a) => {
                        <ActivityCard
                            key={a.id}
                            date={a.startDate}
                            dislikes={2}
                            likes={3}
                            name={a.name}
                        />;
                    })}
                {isOpen && (
                    <>
                        <ActivityCard
                            date="2019-12-03T09:54:33Z"
                            dislikes={2}
                            likes={100}
                            name="Hardcoded Card with very long test text, very long"
                        />
                        <ActivityCard
                            date="2019-12-03T09:54:33Z"
                            dislikes={2}
                            likes={100}
                            name="Hardcoded Card with very long test text, very long"
                        />
                    </>
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
