import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Button, Divider, Icon, Input, ListItem, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import stc from "string-to-color";
import * as Yup from "yup";
import useCurrentAuthUser from "../../hooks/useCurrentAuthUser";
import TripHeaderContext from "../../routes/TripHeaderContext";
import { theme } from "../../theme/theme";
import { TripUserRole, User } from "../../types.d";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import TripTabParamList from "../../types/TripTabParamList";
import { refetchGetTripQuery } from "../Itinerary/types/getTripQuery";
import { refetchGetUniqueTripQuery, useGetUniqueTripQuery } from "./types/get-trip.query";
import { useLeaveTripMutation } from "./types/leave-trip.mutation";
import { useRemoveMemberFromTripMutation } from "./types/remove-member.mutation";
import { useUpdateTripMutation } from "./types/update-trip.mutation";

export enum Mode {
    VIEW,
    EDIT,
}

type TripItineraryScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<TripTabParamList, Routes.TRIP_SETTINGS>,
    StackNavigationProp<RootStackParamList, Routes.ITINERARY>
>;

type TripItineraryRouteProp = RouteProp<TripTabParamList, Routes.TRIP_SETTINGS>;

type TripSettingsProps = {
    navigation: TripItineraryScreenNavigationProp;
    route: TripItineraryRouteProp;
};

export default function TripSettings(props: TripSettingsProps): JSX.Element {
    const { t } = useTranslation();
    const { settingsMode, setSettingsMode, setTitle } = useContext(TripHeaderContext);
    const { getCurrentUser } = useCurrentAuthUser();
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    getCurrentUser().then((user) => {
        setCurrentUser(user);
    });

    const { data, loading } = useGetUniqueTripQuery({
        variables: { tripId: props.route.params.tripId },
    });

    const [executeUpdate, { error: errorUpdate, loading: loadingUpdate }] = useUpdateTripMutation();
    const [executeRemoveMember, { error: errorRemoveMember, loading: loadingRemoveMember }] =
        useRemoveMemberFromTripMutation();
    const [executeLeave, { error: errorLeave, loading: loadingLeave }] = useLeaveTripMutation();

    const handleEdit = (values: FormikValues): void => {
        executeUpdate({
            variables: {
                input: {
                    tripId: props.route.params.tripId,
                    name: values.tripName,
                    description: values.description,
                },
            },
            refetchQueries: [
                refetchGetTripQuery({
                    tripId: props.route.params.tripId,
                }),
            ],
        })
            .then(() => {
                if (setTitle && setSettingsMode) {
                    setTitle(values.tripName);
                    setSettingsMode(Mode.VIEW);
                }
            })
            .catch((e) =>
                Toast.show({
                    text1: t("error.generic"),
                    text2: e.message,
                    type: "error",
                })
            );
    };

    const handleRemoveMember = (userId: string, displayName: string): void => {
        Alert.alert(
            t("screens.tripSettings.removeMember.dialogTitle"),
            t("screens.tripSettings.removeMember.dialogMessage", {
                displayName: displayName,
            }),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("remove"),
                    style: "destructive",
                    onPress: () => {
                        executeRemoveMember({
                            variables: {
                                tripId: props.route.params.tripId,
                                userId: userId,
                            },
                            refetchQueries: [
                                refetchGetUniqueTripQuery({
                                    tripId: props.route.params.tripId,
                                }),
                            ],
                        })
                            .then(() => {
                                if (setSettingsMode) {
                                    setSettingsMode(Mode.VIEW);
                                }
                            })
                            .catch((e) =>
                                Toast.show({
                                    text1: t("error.generic"),
                                    text2: e.message,
                                    type: "error",
                                })
                            );
                    },
                },
            ]
        );
    };

    const handleLeaveTrip = (): void => {
        Alert.alert(
            t("screens.tripSettings.leave.dialogTitle"),
            t("screens.tripSettings.leave.dialogMessage"),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("leave"),
                    style: "destructive",
                    onPress: () => {
                        executeLeave({
                            variables: { tripId: props.route.params.tripId },
                            refetchQueries: [
                                refetchGetTripQuery({
                                    tripId: props.route.params.tripId,
                                }),
                            ],
                        })
                            .then(() => props.navigation.popToTop())
                            .catch((e) =>
                                Toast.show({
                                    text1: t("error.generic"),
                                    text2: e.message,
                                    type: "error",
                                })
                            );
                    },
                },
            ]
        );
    };

    if (data === undefined && loading) {
        return <ActivityIndicator size="large" />;
    } else if (data === undefined) {
        return <Text>{t("error.generic")}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <Text style={theme.fonts.regularCenter.style}>{t("loading")}</Text>}

            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <Text style={theme.fonts.smallSubtitle.style}>
                    {t("screens.tripSettings.tripDetails")}
                </Text>
                <Formik
                    initialValues={{
                        tripName: data.trip.name,
                        description: data.trip.description,
                    }}
                    onSubmit={handleEdit}
                    validationSchema={validationSchema(t)}
                >
                    {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
                        <>
                            <Input
                                label={t("tripName")}
                                labelStyle={theme.fonts.label.style}
                                value={values.tripName}
                                onChangeText={handleChange("tripName")}
                                disabled={settingsMode == Mode.VIEW}
                                onBlur={handleBlur("tripName")}
                                errorMessage={
                                    errors.tripName && touched.tripName
                                        ? errors.tripName
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                                placeholder={t("placeholder.tripName")}
                            />
                            <Input
                                label={t("description")}
                                labelStyle={theme.fonts.label.style}
                                value={values.description ? values.description : ""}
                                onChangeText={handleChange("description")}
                                disabled={settingsMode == Mode.VIEW}
                                onBlur={handleBlur("description")}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textArea}
                                errorMessage={
                                    errors.description && touched.description
                                        ? errors.description
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                                placeholder={t("placeholder.description")}
                            />
                            {errorUpdate && (
                                <Text style={styles.errorText}>{errorUpdate.message}</Text>
                            )}
                            {settingsMode === Mode.EDIT && (
                                <>
                                    <Button
                                        containerStyle={theme.button.primaryButton.container}
                                        buttonStyle={theme.button.primaryButton.button}
                                        title={t("screens.tripSettings.submitUpdate")}
                                        titleStyle={theme.button.primaryButton.title}
                                        onPress={() => handleSubmit()}
                                        loading={loadingUpdate}
                                    />
                                    <Divider style={styles.divider} />
                                </>
                            )}
                        </>
                    )}
                </Formik>
                <Text style={theme.fonts.smallSubtitle.style}>
                    {t("screens.tripSettings.members")}
                </Text>
                {data.trip.members.map((member) => (
                    <ListItem key={member.user.id} bottomDivider>
                        <Avatar
                            rounded
                            containerStyle={{
                                backgroundColor: stc(member.user.id),
                                marginRight: 5,
                            }}
                            size="medium"
                            title={member.user.displayName.charAt(0)?.toUpperCase() ?? "?"}
                        />

                        <ListItem.Content>
                            <ListItem.Title>{member.user.displayName}</ListItem.Title>
                            {member.role === TripUserRole.Admin && (
                                <ListItem.Subtitle>
                                    {member.role.charAt(0).toUpperCase() +
                                        member.role.toLowerCase().slice(1)}
                                </ListItem.Subtitle>
                            )}
                        </ListItem.Content>
                        {settingsMode === Mode.EDIT &&
                            data.trip.admin.id === currentUser?.id &&
                            member.user.id !== currentUser?.id && (
                                <ListItem.Chevron
                                    onPress={() =>
                                        handleRemoveMember(member.user.id, member.user.displayName)
                                    }
                                    name={loadingRemoveMember ? "spinner" : "trash-alt"}
                                    size={20}
                                    color={theme.icon.deleteButton.color}
                                    type="font-awesome-5"
                                />
                            )}
                    </ListItem>
                ))}
                {errorLeave && <Text style={styles.errorText}>{errorLeave.message}</Text>}
                {errorRemoveMember && (
                    <Text style={styles.errorText}>{errorRemoveMember.message}</Text>
                )}
                {data.trip.admin.id !== currentUser?.id && data.trip.members.length > 1 && (
                    <Button
                        containerStyle={theme.button.deleteButton.container}
                        title={t("screens.tripSettings.leave.button")}
                        type="clear"
                        titleStyle={theme.button.deleteButton.title}
                        icon={
                            <Icon
                                style={theme.button.deleteButton.icon}
                                name="sign-out-alt"
                                size={theme.icon.deleteButton.size}
                                color={theme.icon.deleteButton.color}
                                type="font-awesome-5"
                            />
                        }
                        iconRight={true}
                        onPress={() => handleLeaveTrip()}
                        loading={loadingLeave}
                    />
                )}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

// eslint-disable-next-line
const validationSchema = (t: TFunction): object => {
    return Yup.object().shape({
        tripName: Yup.string().min(1).max(30).required(t("validation.nameRequired")),
        description: Yup.string().min(1).max(200).required(t("validation.descriptionRequired")),
    });
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        margin: theme.view.container.spacing,
    },
    errorMessage: {
        color: "#e03030",
        fontSize: 13,
    },
    errorText: {
        fontSize: 16,
        marginBottom: 15,
        alignSelf: "center",
        color: "#e03030",
    },
    textArea: {
        height: 130,
        textAlignVertical: "top",
    },
    divider: {
        marginTop: 10,
        marginBottom: 20,
    },
});
