import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Badge, Icon } from "react-native-elements";
import { Maybe } from "../types";

export interface ActivityCardProps {
    name: string;
    date: Maybe<string> | undefined;
    likes: number;
    dislikes: number;
}

export default function ActivityCard(props: ActivityCardProps) {
    const date: Date = new Date(Date.parse(props.date || ""));
    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
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
                    status="success"
                    value={
                        <View style={styles.badgeBody}>
                            <Icon
                                name="thumbs-up"
                                size={15}
                                type="font-awesome-5"
                            />
                            <Text style={styles.badgeText}>{props.likes}</Text>
                        </View>
                    }
                />
                <Badge
                    onPress={() => console.log("dislike")}
                    badgeStyle={styles.badge}
                    status="error"
                    value={
                        <View style={styles.badgeBody}>
                            <Icon
                                name="thumbs-down"
                                size={15}
                                type="font-awesome-5"
                            />
                            <Text style={styles.badgeText}>
                                {props.dislikes}
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    badgeBody: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    badgeText: {
        fontSize: 16,
        marginLeft: 3,
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
});
