import React from "react";
import { FlatList, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { Tooltip } from "react-native-elements/dist/tooltip/Tooltip";
import { TripsQuery } from "./types/trip-dashboard.query";

export interface AvatarListProps {
    tripMembers: TripsQuery["trips"][0]["members"];
}

const AvatarList: React.FC<AvatarListProps> = (props: AvatarListProps) => {
    return (
        <FlatList
            horizontal
            data={props.tripMembers}
            renderItem={({ item: member }) => {
                return (
                    <View>
                        <Tooltip
                            popover={<Text>{member.user.displayName}</Text>}
                        >
                            <Avatar
                                rounded
                                containerStyle={{
                                    backgroundColor: member.color,
                                }}
                                size={"medium"}
                                title={
                                    member.user.displayName
                                        .charAt(0)
                                        ?.toUpperCase() ?? "?"
                                }
                            />
                        </Tooltip>
                    </View>
                );
            }}
            keyExtractor={(member) => member.id}
        />
    );
};

export default AvatarList;
