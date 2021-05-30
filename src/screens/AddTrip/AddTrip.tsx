import { useNavigation } from "@react-navigation/core";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import SvgLogo from "../../components/SvgLogo";
import { theme } from "../../theme/theme";
import { Routes } from "../../types/Routes";
import { refetchTripsQuery } from "../TripsDashboard/types/trip-dashboard.query";
import { useCreateTripMutation } from "./types/add-trip.mutation";

export const AddTrip = (): JSX.Element => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [execute, { error, loading }] = useCreateTripMutation();

    const handleSubmit = (values: FormikValues): void => {
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
                    index: 1,
                    routes: [
                        {
                            name: Routes.DASHBOARD,
                        },
                        {
                            name: Routes.SHARE_TRIP,
                            params: {
                                tripId: result.data?.createTrip.id,
                                // mode: Mode.SHARE_TRIP,
                            },
                        },
                    ],
                });
            })
            .catch((e) => console.error(e)); // TODO - Notify user
    };
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <ScrollView
                keyboardShouldPersistTaps="handled"
                bounces={true}
                contentContainerStyle={styles.scrollView}
            >
                <SafeAreaView style={styles.container}>
                    <SvgLogo style={styles.logo} width={75} height={75} />
                    <Text style={theme.fonts.title.style}>{t("screens.add_trip.title")}</Text>
                    <Formik
                        initialValues={{ tripName: "", description: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema(t)}
                    >
                        {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
                            <>
                                <Input
                                    label={t("screens.add_trip.trip_name")}
                                    errorMessage={
                                        errors.tripName && touched.tripName
                                            ? errors.tripName
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={t("placeholder.tripName")}
                                    leftIcon={
                                        <Icon
                                            style={styles.icon}
                                            name="suitcase"
                                            size={theme.icon.input.size}
                                            color={theme.icon.input.color}
                                            type="font-awesome-5"
                                        />
                                    }
                                    value={values.tripName}
                                    onChangeText={handleChange("tripName")}
                                    onBlur={handleBlur("tripName")}
                                    labelStyle={theme.fonts.label.style}
                                />
                                <Input
                                    label={t("description")}
                                    errorMessage={
                                        errors.description && touched.description
                                            ? errors.description
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={t("placeholder.description")}
                                    leftIcon={
                                        <Icon
                                            style={styles.icon}
                                            name="comment"
                                            size={theme.icon.input.size}
                                            color={theme.icon.input.color}
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
                                    labelStyle={theme.fonts.label.style}
                                />
                                {error && <Text style={styles.errorText}>{error.message}</Text>}
                                <Button
                                    containerStyle={theme.button.primaryButton.container}
                                    buttonStyle={theme.button.primaryButton.button}
                                    title={t("screens.add_trip.submit_add_trip")}
                                    titleStyle={theme.button.primaryButton.title}
                                    icon={
                                        <Icon
                                            style={theme.button.primaryButton.icon}
                                            name="arrow-right"
                                            size={theme.icon.primaryButton.size}
                                            color={theme.icon.primaryButton.color}
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
                        containerStyle={theme.button.tertiaryButton.container}
                        type="clear"
                        title={t("screens.add_trip.stay_home")}
                        titleStyle={theme.button.tertiaryButton.title}
                        onPress={() => navigation.navigate(Routes.DASHBOARD)}
                    />
                </SafeAreaView>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};
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
        flexDirection: "column",
        justifyContent: "center",
        margin: theme.view.container.spacing,
    },
    icon: {
        marginRight: 10,
    },
    leftIcon: {
        height: "100%",
        textAlignVertical: "top",
        justifyContent: "flex-start",
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
    textArea: {
        height: 130,
        textAlignVertical: "top",
    },
});
