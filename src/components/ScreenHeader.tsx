import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Header, Text } from "react-native-elements";

export interface ScreenHeaderProps {
    screenTitle: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
    return (
        <View>
            <Header
                placement="left"
                centerComponent={<Text h1>{props.screenTitle}</Text>}
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
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        color: "black",
        marginLeft: -15, // TODO - Find a way how to not hard code this value
    },
    avatar: {
        backgroundColor: "red",
        borderWidth: 2,
    },
});

export default ScreenHeader;
