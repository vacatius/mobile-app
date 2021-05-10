import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Badge, Icon } from "react-native-elements";
import useCurrentAuthUser from "../../hooks/useCurrentAuthUser";
import { refetchGetTripQuery } from "../../screens/Itinerary/types/getTripQuery";
import { Mode } from "../../screens/ViewAddEditActivity/ViewAddEditActivity";
import * as Types from "../../types.d";
import { Routes } from "../../types/Routes";
import { useCreateActivityReactionMutation } from "./types/CreateActivityReactionMutation";
import { useRemoveActivityReactionMutation } from "./types/RemoveActivityReactionMutation";
import { useUpdateActivityReactionMutation } from "./types/UpdateActivityReactionMutation";

export interface ActivityCardProps {
    id: string;
    name: string;
    date: Types.Maybe<string> | undefined;
    activityReactions: Array<{
        id: string;
        activityReactionType: Types.ActivityReactionType;
        addedByUser: { id: string };
    }>;
    tripId: string;
}

export default function ActivityCard(props: ActivityCardProps): JSX.Element {
    const { getCurrentUser } = useCurrentAuthUser();
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [userId, setUserId] = useState("");
    const [executeCreate] = useCreateActivityReactionMutation();
    const [executeRemove] = useRemoveActivityReactionMutation();
    const [executeUpdate] = useUpdateActivityReactionMutation();
    const navigation = useNavigation();

    const date: Date = new Date(Date.parse(props.date || ""));

    getCurrentUser().then((user) => {
        if (user == null) {
            return;
        }
        setUserId(user.id);

        setUserLiked(
            props.activityReactions.filter(
                (r) =>
                    r.activityReactionType === Types.ActivityReactionType.Like &&
                    r.addedByUser.id === user.id
            ).length > 0
        );

        setUserDisliked(
            props.activityReactions.filter(
                (r) =>
                    r.activityReactionType === Types.ActivityReactionType.Dislike &&
                    r.addedByUser.id === user.id
            ).length > 0
        );
    });

    const handleReactionType = (reactionType: Types.ActivityReactionType): void => {
        const remove = (): void => {
            const activityReactionId =
                props.activityReactions.find((r) => r.addedByUser.id === userId)?.id || "";
            if (activityReactionId.length > 0) {
                executeRemove({
                    variables: {
                        input: activityReactionId,
                    },
                    refetchQueries: [
                        refetchGetTripQuery({
                            tripId: props.tripId,
                        }),
                    ],
                }).catch((e) => console.log(e)); // TODO error handling
            }
        };

        const create = (activityReactionType: Types.ActivityReactionType): void => {
            executeCreate({
                variables: {
                    input: {
                        activityId: props.id,
                        activityReactionType: activityReactionType,
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: props.tripId,
                    }),
                ],
            }).catch((e) => console.log(e)); // TODO error handling
        };

        const update = (activityReactionType: Types.ActivityReactionType): void => {
            const activityReactionId =
                props.activityReactions.find((r) => r.addedByUser.id === userId)?.id || "";
            if (activityReactionId.length > 0) {
                executeUpdate({
                    variables: {
                        input: {
                            activityReactionType: activityReactionType,
                            activityReactionId: activityReactionId,
                        },
                    },
                    refetchQueries: [
                        refetchGetTripQuery({
                            tripId: props.tripId,
                        }),
                    ],
                }).catch((e) => console.log(e)); // TODO error handling
            } else {
                // should a user for whatever unknown reason not have an active
                // like/dislike anymore
                create(activityReactionType);
            }
        };
        if (userLiked) {
            // check if user has already liked activity
            if (reactionType === Types.ActivityReactionType.Like) {
                remove();
            } else {
                update(Types.ActivityReactionType.Dislike);
            }
        } else if (userDisliked) {
            // check if user has already disliked activity
            if (reactionType === Types.ActivityReactionType.Dislike) {
                remove();
            } else {
                update(Types.ActivityReactionType.Like);
            }
        } else {
            create(reactionType);
        }
    };

    const getTime = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    const openActivityDetails = (): void => {
        navigation.navigate(Routes.VIEW_ADD_EDIT_ACTIVITY, {
            activityId: props.id,
            tripId: props.tripId,
            activityName: props.name,
            mode: Mode.VIEW,
        });
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => openActivityDetails()}>
                <View style={styles.cardBody}>
                    <Text numberOfLines={2} style={styles.cardName}>
                        {props.name}
                    </Text>
                    <View style={styles.cardExtra}>
                        <View style={styles.extraDate}>
                            <Text style={styles.cardDate}>{date.toLocaleDateString()}</Text>
                            <Text style={styles.cardDate}>{getTime(date)}</Text>
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
                    onPress={() => handleReactionType(Types.ActivityReactionType.Like)}
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
                                        ? StyleSheet.compose(styles.badgeText, styles.likeColor)
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
                    onPress={() => handleReactionType(Types.ActivityReactionType.Dislike)}
                    badgeStyle={styles.badge}
                    value={
                        <View style={styles.badgeBody}>
                            <Icon
                                name="thumbs-down"
                                size={15}
                                type="font-awesome-5"
                                color={userDisliked ? styles.likeColor.color : ""}
                            />
                            <Text
                                style={
                                    userDisliked
                                        ? StyleSheet.compose(styles.badgeText, styles.likeColor)
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
