import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { Avatar, Text, Button } from "react-native-elements";
import { LoginMutation } from "../screens/Login/types/loginMutation";
import stc from "string-to-color";
import { StackActions, useNavigation } from "@react-navigation/core";
import { Routes } from "../types/Routes";

export interface ScreenHeaderProps {
    screenTitle: string;
    user?: LoginMutation["login"]["user"];
    actionCallback?: () => void;
    actionIcon?: JSX.Element;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = (props: ScreenHeaderProps) => {
    const navigation = useNavigation();

    let textWidth = 70;
    let extraSpace = 0;
    if (props.user == undefined) {
        extraSpace += 15;
    }
    if (props.actionIcon == undefined) {
        extraSpace += 8;
    }
    if (!navigation.canGoBack()) {
        extraSpace += 8;
    }

    textWidth += extraSpace;
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                overflow: "hidden",
                alignItems: "center",
                minWidth: "100%",
                marginLeft: Platform.OS === "ios" && navigation.canGoBack() ? 10 : 0,
            }}
        >
            <Text
                numberOfLines={1}
                style={{
                    fontSize: 22,
                    minWidth: `${textWidth}%`,
                    maxWidth: `${textWidth}%`,
                }}
            >
                {props.screenTitle}
            </Text>
            {props.actionIcon !== undefined && (
                <Button
                    type="clear"
                    icon={props.actionIcon}
                    onPress={props.actionCallback}
                    containerStyle={{
                        marginLeft: "auto",
                    }}
                />
            )}
            {props.user !== undefined && (
                <TouchableOpacity
                    style={{
                        marginLeft: "auto",
                    }}
                    onPress={() =>
                        navigation.dispatch(
                            StackActions.push(Routes.PROFILE, {
                                user: props.user,
                            })
                        )
                    }
                >
                    <Avatar
                        rounded
                        title={props.user.displayName.charAt(0).toUpperCase()}
                        containerStyle={{ backgroundColor: stc(props.user.id) }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

ScreenHeader.displayName = "ScreenHeader";
export default ScreenHeader;
