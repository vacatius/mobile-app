import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

interface ActivityGroupHeaderProps {
    title: string;
    onEdit: () => void;
    onAdd: () => void;
    onOpen: () => void;
    isOpen: boolean;
}

export default function ActivityGroupHeader(
    props: ActivityGroupHeaderProps
): JSX.Element {
    const iconSize = 30;

    return (
        <View style={styles.container}>
            <View style={styles.containerItemLeft}>
                <Text style={styles.title}>{props.title}</Text>
                <Icon
                    name="pen"
                    size={iconSize}
                    type="font-awesome-5"
                    color="#2596be"
                    onPress={props.onEdit}
                />
            </View>
            <View style={styles.containerItemRight}>
                <Icon
                    name="plus"
                    size={iconSize}
                    type="font-awesome-5"
                    color="#2596be"
                    onPress={props.onAdd}
                    style={styles.add}
                />
                <Icon
                    name={props.isOpen ? "chevron-up" : "chevron-down"}
                    size={iconSize}
                    type="font-awesome-5"
                    color="black"
                    onPress={props.onOpen}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "yellow",
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    containerItemRight: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 10,
    },
    containerItemLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 10,
    },
    add: {
        marginLeft: 30,
    },
    title: {
        fontSize: 24,
        marginRight: 10,
    },
});
