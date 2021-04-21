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
                <TouchableOpacity>
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
        backgroundColor: "transparent",
        color: "black",
    },
    avatar: {
        backgroundColor: "red",
        borderWidth: 2,
    },
});

export default ScreenHeader;
