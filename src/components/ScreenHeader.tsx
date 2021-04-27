import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text, Button, Icon } from "react-native-elements";
import { LoginMutation } from "../screens/Login/types/loginMutation";

export interface ScreenHeaderProps {
    screenTitle: string;
    user?: LoginMutation["login"]["user"];
    actionCallback?: () => void;
    actionIcon?: JSX.Element;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (
    props: ScreenHeaderProps
) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {navigation.canGoBack() && (
                <Button
                    onPress={navigation.goBack}
                    type="clear"
                    containerStyle={{
                        minHeight: "100%",
                        justifyContent: "center",
                    }}
                    icon={
                        <Icon
                            name="arrow-left"
                            size={20}
                            color="black"
                            type="font-awesome-5"
                        />
                    }
                />
            )}
            <Text
                numberOfLines={1}
                style={{
                    fontSize: 20,
                    textAlign: "center",
                    width: "65%",
                    marginLeft: "auto",
                    fontWeight: "bold",
                }}
            >
                {props.screenTitle}
            </Text>
            <Button
                type="clear"
                icon={props.actionIcon}
                onPress={props.actionCallback}
                containerStyle={{
                    minHeight: "100%",
                    justifyContent: "center",
                    marginLeft: "auto",
                }}
            />
            {props.user !== undefined && (
                <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={() =>
                        console.log("press avatar of user: " + props.user?.id)
                    }
                >
                    <Avatar
                        rounded
                        title={props.user.displayName.charAt(0)}
                        containerStyle={styles.avatar}
                        size="medium"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: "red",
    },
    container: {
        flex: 1,
        flexDirection: "row",
        overflow: "hidden",
        alignItems: "center",
        marginLeft: -8,
        marginRight: -8,
    },
});

ScreenHeader.displayName = "ScreenHeader";
export default ScreenHeader;
