import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useCreateTripMutation } from "./types/add-trip.mutation";

export type Props = {};
export const AddTrip = (props: Props) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [execute, { error, loading }] = useCreateTripMutation();
    const [placeholder, setPlaceholder] = useState({
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

    const handleSubmit = () => {
        console.log("add trip pressed");
    };
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            bounces={true}
            contentContainerStyle={styles.scrollView}
        >
            <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{t("screen_header_add_trip")}</Text>
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
                        isValid,
                        isSubmitting,
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
                                value={values.description}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                            />
                            {error && (
                                <Text style={styles.errorText}>
                                    {error.message}
                                </Text>
                            )}
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.buttonLogin}
                                title={t("screen_header_add_trip")}
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
                    title={t("screen_header_trip_dashBoard")}
                    titleStyle={{ color: "darkslategray" }}
                    onPress={() => navigation.navigate("Dashboard")}
                />
            </SafeAreaView>
        </ScrollView>
    );
};
const validationSchema = (t: TFunction): object => {
    return Yup.object().shape({
        name: Yup.string().min(1).required(t("validation.usernameRequired")),
    });
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
    text: {
        fontSize: 40,
        marginBottom: 30,
        alignSelf: "center",
    },
    icon: {
        marginRight: 10,
    },
    iconButton: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    buttonLogin: {
        backgroundColor: "#BCE1B0",
    },
    logo: {
        alignSelf: "center",
        marginBottom: 20,
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
});
