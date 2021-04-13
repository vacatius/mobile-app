import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { TripMember } from "../../types";

export interface AvatarListProps {
    // TODO
    tripMembers?: TripMember[];
}

const testData = [
    // TODO - Remove in favor of tripMembers
    {
        id: "1",
        color: "red",
        user: {
            username: "A",
        },
    },
    {
        id: "2",
        color: "blue",
        user: {
            username: "C",
        },
    },
];

const AvatarList: React.FC<AvatarListProps> = (props: AvatarListProps) => {
    return (
        <FlatList
            horizontal
            data={testData} // TODO
            renderItem={({ item: member }) => {
                return (
                    <Avatar
                        rounded
                        containerStyle={{ backgroundColor: member.color }}
                        size={"medium"}
                        title={member.user.username}
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
