import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Button, Icon, Input, ListItem, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import stc from "string-to-color";
import * as Yup from "yup";
import useCurrentAuthUser from "../../hooks/useCurrentAuthUser";
import TripHeaderContext from "../../routes/TripHeaderContext";
import { User } from "../../types";
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
    const [placeholder] = useState({
        tripName: t("placeholder.tripName", { returnObjects: true })[
            Math.floor(
                Math.random() *
                    t("placeholder.tripName", {
                        returnObjects: true,
                    }).length
            )
        ],
        description: t("placeholder.description", { returnObjects: true })[
            Math.floor(
                Math.random() *
                    t("placeholder.description", {
                        returnObjects: true,
                    }).length
            )
        ],
    });

    getCurrentUser().then((user) => {
        setCurrentUser(user);
    });

    const { data, loading } = useGetUniqueTripQuery({
        variables: { tripId: props.route.params.tripId },
    });

    const [executeUpdate, { error: errorUpdate, loading: loadingUpdate }] = useUpdateTripMutation();
    const [
        executeRemoveMember,
        { error: errorRemoveMember, loading: loadingRemoveMember },
    ] = useRemoveMemberFromTripMutation();
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

    const handleRemoveMember = (userId: string): void => {
        Alert.alert(
            t("screens.tripSettings.removeMember.dialogTitle"),
            t("screens.tripSettings.removeMember.dialogMessage"),
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
                        }).catch((e) =>
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

    if (data === undefined) {
        return <Text>{t("error.generic")}</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <Text>{t("loading")}</Text>}

            <KeyboardAwareScrollView>
                <Text h3 style={{ marginBottom: 15 }}>
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
                                placeholder={placeholder.tripName}
                            />
                            <Input
                                label={t("description")}
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
                                placeholder={placeholder.description}
                            />
                            {errorUpdate && (
                                <Text style={styles.errorText}>{errorUpdate.message}</Text>
                            )}
                            {settingsMode === Mode.EDIT && (
                                <Button
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.submitButton}
                                    title={t("screens.tripSettings.submitUpdate")}
                                    titleStyle={{
                                        color: "black",
                                        fontSize: 25,
                                    }}
                                    onPress={() => handleSubmit()}
                                    loading={loadingUpdate}
                                />
                            )}
                        </>
                    )}
                </Formik>
                <Text h3 style={{ marginBottom: 15 }}>
                    {t("screens.tripSettings.members")}
                </Text>
                {data.trip.members.map((member, i) => (
                    <ListItem key={i} bottomDivider>
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
                            {member.role === "ADMIN" && (
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
                                    onPress={() => handleRemoveMember(member.user.id)}
                                    name={loadingRemoveMember ? "spinner" : "trash-alt"}
                                    size={20}
                                    color="#e03030"
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
                        containerStyle={styles.buttonContainer}
                        title={t("screens.tripSettings.leave.button")}
                        type="clear"
                        titleStyle={{
                            color: "#e03030",
                        }}
                        icon={
                            <Icon
                                style={styles.iconButton}
                                name="sign-out-alt"
                                size={15}
                                color="#e03030"
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
        margin: 20,
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
    buttonContainer: {
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: "#BCE1B0",
    },
    iconButton: {
        marginLeft: 10,
    },
});
