import React from "react";
import { FlatList, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { Tooltip } from "react-native-elements/dist/tooltip/Tooltip";
import { TripsQuery } from "../../screens/TripsDashboard/types/trip-dashboard.query";

export interface AvatarListProps {
    tripMembers: TripsQuery["trips"][0]["members"];
}

const AvatarList: React.FC<AvatarListProps> = (props: AvatarListProps) => (
    <FlatList
        horizontal
        scrollEnabled={false}
        data={props.tripMembers}
        renderItem={({ item: member }) => (
            <View>
                <Tooltip popover={<Text>{member.user.displayName}</Text>}>
                    <Avatar
                        rounded
                        containerStyle={{
                            backgroundColor: member.color,
                            marginRight: 5,
                        }}
                        size="medium"
                        title={
                            member.user.displayName.charAt(0)?.toUpperCase() ??
                            "?"
                        }
                    />
                </Tooltip>
            </View>
        )}
        keyExtractor={(member) => member.id}
    />
);

export default AvatarList;
