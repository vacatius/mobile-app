import { useNavigation } from "@react-navigation/core";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import SvgLogo from "../../components/SvgLogo";
import { Trip } from "../../types";
import { Routes } from "../../types/Routes";
import { refetchTripsQuery } from "../TripsDashboard/types/trip-dashboard.query";
import { useCreateTripMutation } from "./types/add-trip.mutation";

export type Props = {
    editTrip?: Trip;
};
export const AddTrip = (props: Props): JSX.Element => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [execute, { error, loading }] = useCreateTripMutation();
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

    const handleSubmit = (values: FormikValues) => {
        console.log("add trip pressed");
        execute({
            variables: {
                input: {
                    name: values.tripName,
                    description: values.description,
                },
            },
            refetchQueries: [refetchTripsQuery()],
        })
            .then((result) => {
                console.log("Successfully created this trip");
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: "ShareTrip",
                            params: {
                                trip: result.data?.createTrip,
                            },
                        },
                    ],
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            bounces={true}
            contentContainerStyle={styles.scrollView}
        >
            <SafeAreaView style={styles.container}>
                <SvgLogo style={styles.logo} width={75} height={75} />
                <Text style={styles.text}>{t("screens.add_trip.title")}</Text>
                <Formik
                    initialValues={{ tripName: "", description: "" }}
                    onSubmit={handleSubmit}
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
                                label={t("screens.add_trip.trip_name")}
                                errorMessage={
                                    errors.tripName && touched.tripName
                                        ? errors.tripName
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                                placeholder={placeholder.tripName}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="suitcase"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.tripName}
                                onChangeText={handleChange("tripName")}
                                onBlur={handleBlur("tripName")}
                            />
                            <Input
                                label={t("description")}
                                errorMessage={
                                    errors.description && touched.description
                                        ? errors.description
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                                placeholder={placeholder.description}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="comment"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                leftIconContainerStyle={styles.leftIcon}
                                value={values.description}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textArea}
                            />
                            {error && (
                                <Text style={styles.errorText}>
                                    {error.message}
                                </Text>
                            )}
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.submitButton}
                                title={t("screens.add_trip.submit_add_trip")}
                                titleStyle={{
                                    color: "black",
                                    fontSize: 25,
                                }}
                                icon={
                                    <Icon
                                        style={styles.iconButton}
                                        name="arrow-right"
                                        size={15}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                iconRight={true}
                                onPress={() => handleSubmit()}
                                loading={loading}
                            />
                        </>
                    )}
                </Formik>
                <Button
                    containerStyle={styles.buttonContainer}
                    type="clear"
                    title={t("screens.add_trip.stay_home")}
                    titleStyle={{ color: "darkslategray" }}
                    onPress={() => navigation.navigate(Routes.DASHBOARD)}
                />
            </SafeAreaView>
        </ScrollView>
    );
};
// eslint-disable-next-line
const validationSchema = (t: TFunction): object => {
    return Yup.object().shape({
        tripName: Yup.string()
            .min(1)
            .max(30)
            .required(t("validation.tripNameRequired")),
        description: Yup.string()
            .min(1)
            .max(200)
            .required(t("validation.descriptionRequired")),
    });
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 20,
    },
    text: {
        fontSize: 40,
        marginBottom: 30,
        alignSelf: "center",
    },
    icon: {
        marginRight: 10,
    },
    leftIcon: {
        height: "100%",
        textAlignVertical: "top",
        justifyContent: "flex-start",
    },
    iconButton: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    logo: {
        alignSelf: "center",
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: "#BCE1B0",
    },
    errorText: {
        fontSize: 16,
        marginBottom: 15,
        alignSelf: "center",
        color: "#e03030",
    },
    errorMessage: {
        color: "#e03030",
        fontSize: 13,
    },
    scrollView: {
        flexGrow: 1,
    },
    textArea: {
        height: 130,
        textAlignVertical: "top",
    },
});
