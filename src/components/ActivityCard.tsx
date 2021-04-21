import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Badge, Icon } from "react-native-elements";
import useCurrentAuthUser from "../hooks/useCurrentAuthUser";
import * as Types from "../types.d";

export interface ActivityCardProps {
    name: string;
    date: Types.Maybe<string> | undefined;
    activityReactions: Array<{
        id: string;
        activityReactionType: Types.ActivityReactionType;
        addedByUser: { id: string };
    }>;
}

export default function ActivityCard(props: ActivityCardProps) {
    const { getCurrentUser } = useCurrentAuthUser();
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);

    const date: Date = new Date(Date.parse(props.date || ""));

    getCurrentUser().then((user) => {
        if (user == null) {
            return;
        }

        setUserLiked(
            props.activityReactions.filter(
                (r) =>
                    r.activityReactionType ===
                        Types.ActivityReactionType.Like &&
                    r.addedByUser.id === user.id
            ).length > 0
        );

        setUserDisliked(
            props.activityReactions.filter(
                (r) =>
                    r.activityReactionType ===
                        Types.ActivityReactionType.Dislike &&
                    r.addedByUser.id === user.id
            ).length > 0
        );
    });

    return (
        <View style={styles.container}>
            <Pressable onPress={() => console.log("press activity")}>
                <View style={styles.cardBody}>
                    <Text numberOfLines={2} style={styles.cardName}>
                        {props.name}
                    </Text>
                    <View style={styles.cardExtra}>
                        <View style={styles.extraDate}>
                            <Text style={styles.cardDate}>
                                {date.toLocaleDateString()}
                            </Text>
                            <Text style={styles.cardDate}>
                                {date.toLocaleTimeString()}
                            </Text>
                        </View>
                        <Icon
                            name="chevron-right"
                            size={30}
                            type="font-awesome-5"
                            style={styles.extraIcon}
                        />
                    </View>
                </View>
            </Pressable>
            <View style={styles.badgeRow}>
                <Badge
                    onPress={() => console.log("like")}
                    badgeStyle={styles.badge}
                    value={
                        <View style={styles.badgeBody}>
                            <Icon
                                name="thumbs-up"
                                size={15}
                                type="font-awesome-5"
                                color={userLiked ? styles.likeColor.color : ""}
                            />
                            <Text
                                style={
                                    userLiked
                                        ? StyleSheet.compose(
                                              styles.badgeText,
                                              styles.likeColor
                                          )
                                        : styles.badgeText
                                }
                            >
                                {
                                    props.activityReactions.filter(
                                        (r) =>
                                            r.activityReactionType ===
                                            Types.ActivityReactionType.Like
                                    ).length
                                }
                            </Text>
                        </View>
                    }
                />
                <Badge
                    onPress={() => console.log("dislike")}
                    badgeStyle={styles.badge}
                    value={
                        <View style={styles.badgeBody}>
                            <Icon
                                name="thumbs-down"
                                size={15}
                                type="font-awesome-5"
                                color={
                                    userDisliked ? styles.likeColor.color : ""
                                }
                            />
                            <Text
                                style={
                                    userDisliked
                                        ? StyleSheet.compose(
                                              styles.badgeText,
                                              styles.likeColor
                                          )
                                        : styles.badgeText
                                }
                            >
                                {
                                    props.activityReactions.filter(
                                        (r) =>
                                            r.activityReactionType ===
                                            Types.ActivityReactionType.Dislike
                                    ).length
                                }
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 10,
    },
    cardBody: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#444",
        minHeight: 70,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    badge: {
        width: 60,
        height: 30,
        borderRadius: 20,
        marginLeft: 3,
        marginTop: -15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#444",
    },
    badgeBody: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    badgeText: {
        fontSize: 16,
        marginLeft: 3,
        color: "black",
    },
    badgeRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 5,
        zIndex: 1,
    },
    cardName: {
        fontSize: 20,
        maxWidth: "60%",
    },
    cardDate: {
        fontSize: 16,
    },
    cardExtra: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    extraDate: {
        flex: 1,
        alignItems: "flex-end",
    },
    extraIcon: {
        marginLeft: 10,
    },
    likeColor: {
        color: "#007AFF",
    },
});
