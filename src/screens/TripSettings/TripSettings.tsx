import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Button, Input, ListItem, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import stc from "string-to-color";
import * as Yup from "yup";
import TripHeaderContext from "../../routes/TripHeaderContext";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import TripTabParamList from "../../types/TripTabParamList";
import {
    refetchGetTripQuery,
    useGetTripQuery,
} from "../Itinerary/types/getTripQuery";
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
    const { settingsMode, setSettingsMode, setTitle } = useContext(
        TripHeaderContext
    );

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

    const { data, loading } = useGetTripQuery({
        variables: { tripId: props.route.params.tripId },
    });

    const [
        executeUpdate,
        { error: errorUpdate, loading: loadingUpdate },
    ] = useUpdateTripMutation();

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
        // TODO do something here
        console.log("handle remove member");
    };

    if (data?.node?.__typename === "Trip") {
        return (
            <SafeAreaView style={styles.container}>
                {loading && <Text>{t("loading")}</Text>}

                <KeyboardAwareScrollView>
                    <Formik
                        initialValues={{
                            tripName: data.node.name,
                            description: data.node.description,
                        }}
                        onSubmit={handleEdit}
                        validationSchema={validationSchema(t)}
                    >
                        {({
                            handleChange,
                            values,
                            handleSubmit,
                            errors,
                            touched,
                            handleBlur,
                        }) => (
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
                                    value={
                                        values.description
                                            ? values.description
                                            : ""
                                    }
                                    onChangeText={handleChange("description")}
                                    disabled={settingsMode == Mode.VIEW}
                                    onBlur={handleBlur("description")}
                                    multiline={true}
                                    numberOfLines={4}
                                    style={styles.textArea}
                                    errorMessage={
                                        errors.description &&
                                        touched.description
                                            ? errors.description
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={placeholder.description}
                                />
                                {errorUpdate && (
                                    <Text style={styles.errorText}>
                                        {errorUpdate.message}
                                    </Text>
                                )}
                                {settingsMode === Mode.EDIT && (
                                    <Button
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={styles.submitButton}
                                        title={t(
                                            "screens.tripSettings.submitUpdate"
                                        )}
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
                    {data.node.members.map((member, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar
                                rounded
                                containerStyle={{
                                    backgroundColor: stc(member.user.id),
                                    marginRight: 5,
                                }}
                                size="medium"
                                title={
                                    member.user.displayName
                                        .charAt(0)
                                        ?.toUpperCase() ?? "?"
                                }
                            />

                            <ListItem.Content>
                                <ListItem.Title>
                                    {member.user.displayName}
                                </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron
                                onPress={() =>
                                    handleRemoveMember(member.user.id)
                                }
                                name="trash-alt"
                                size={20}
                                color="#e03030"
                                type="font-awesome-5"
                            />
                        </ListItem>
                    ))}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    } else {
        return <Text>{t("error.generic")}</Text>;
    }
}

// eslint-disable-next-line
const validationSchema = (t: TFunction): object => {
    return Yup.object().shape({
        tripName: Yup.string()
            .min(1)
            .max(30)
            .required(t("validation.nameRequired")),
        description: Yup.string()
            .min(1)
            .max(200)
            .required(t("validation.descriptionRequired")),
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
});
