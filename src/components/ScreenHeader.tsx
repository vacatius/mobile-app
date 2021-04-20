import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Header, Text } from "react-native-elements";

export interface ScreenHeaderProps {
    screenTitle: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (
    props: ScreenHeaderProps
) => (
    <View>
        <Header
            placement="left"
            leftComponent={<Text h1>{props.screenTitle}</Text>}
            rightComponent={
                <TouchableOpacity style={styles.avatarContainer}>
                    <Avatar
                        rounded
                        title="V"
                        containerStyle={styles.avatar}
                        size="medium"
                    />
                </TouchableOpacity>
            }
            containerStyle={styles.header}
        />
    </View>
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "grey",
        color: "black",
        textAlignVertical: "top",
    },
    avatarContainer: {
        flex: 1,
        justifyContent: "center",
    },
    avatar: {
        backgroundColor: "red",
        borderWidth: 2,
    },
});

ScreenHeader.displayName = "ScreenHeader";
export default ScreenHeader;
