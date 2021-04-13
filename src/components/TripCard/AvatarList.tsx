import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { TripMember } from "../../types";
import { TripsQuery } from "./types/trip-dashboard.query";

export interface AvatarListProps {
    // TODO
    tripMembers: TripsQuery["trips"][0]["members"];
}


const AvatarList: React.FC<AvatarListProps> = (props: AvatarListProps) => {
    return (
        <FlatList
            horizontal
            data={props.tripMembers} // TODO
            renderItem={({ item: member }) => {
                return (
                    <Avatar
                        rounded
                        containerStyle={{ backgroundColor: member.color }}
                        size={"medium"}
                        title={member.user.displayName.charAt(0)?.toUpperCase() ?? "?"}
                    />
                );
            }}
            keyExtractor={(member) => member.id}
        />
    );
};

const styles = StyleSheet.create({
    avatar: {
        // TODO - How to assign to Avatar?
        borderWidth: 2,
        marginRight: 3,
    },
});

export default AvatarList;
