import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native-elements";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.PROFILE
>;

type ProfileRouteProp = RouteProp<RootStackParamList, Routes.PROFILE>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileRouteProp;
};

const Profile = (props: Props): JSX.Element => {
    return <Text>{props.route.params.userID}</Text>;
};

export default Profile;
