import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

interface ActivityGroupHeaderProps {
    title: string;
    onEdit: () => void;
    onAdd: () => void;
    onOpen: () => void;
    isOpen: boolean;
}

const iconValues = {
    size: 30,
    blue: "#007AFF",
};

export default function ActivityGroupHeader(props: ActivityGroupHeaderProps): JSX.Element {
    return (
        <Pressable onPress={props.onOpen}>
            <View style={styles.container}>
                <View style={styles.containerItemLeft}>
                    <Text numberOfLines={1} style={styles.title}>
                        {props.title}
                    </Text>
                </View>
                <View style={styles.containerItemRight}>
                    <Icon
                        name="pen"
                        size={iconValues.size - 5}
                        type="font-awesome-5"
                        color={iconValues.blue}
                        onPress={props.onEdit}
                        style={styles.penIcon}
                    />
                    <Icon
                        name="plus"
                        size={iconValues.size}
                        type="font-awesome-5"
                        color={iconValues.blue}
                        onPress={props.onAdd}
                        style={styles.addIcon}
                    />
                    <Icon
                        name={props.isOpen ? "chevron-up" : "chevron-down"}
                        size={iconValues.size}
                        type="font-awesome-5"
                        color="black"
                    />
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#ccc",
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    containerItemRight: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 10,
    },
    containerItemLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 10,
    },
    penIcon: {
        marginRight: 30,
    },
    addIcon: {
        marginRight: 30,
    },
    title: {
        fontSize: 24,
        marginRight: 10,
    },
});
