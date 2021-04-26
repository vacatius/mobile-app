import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import * as Yup from "yup";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { Formik, FormikValues } from "formik";
import { useGetActivityQuery } from "./types/getActivityQuery";
import { useUpdateActivityMutation } from "./types/updateActivityMutation";

export type Mode = "view" | "edit";

type ViewEditActivityScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.VIEW_EDIT_ACTIVITY
>;

type ViewEditActivityRouteProp = RouteProp<
    RootStackParamList,
    Routes.VIEW_EDIT_ACTIVITY
>;

type Props = {
    route: ViewEditActivityRouteProp;
};

const ViewEditActivity = (props: Props) => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>("view");

    const { data } = useGetActivityQuery({
        variables: { activityId: props.route.params.activityId },
    });

    const [execute, { error, loading }] = useUpdateActivityMutation();

    const getTime = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    };

    const handleEdit = (values: FormikValues) => {
        if (data?.node?.__typename === "Activity") {
            execute({
                variables: {
                    input: {
                        activityId: props.route.params.activityId,
                        name: values.name,
                        description: values.description,
                        linkToDetails: data.node.linkToDetails,
                        startDate: data.node.startDate,
                        endDate: data.node.endDate,
                    },
                },
            }).catch((e) => console.log(e)); // TODO handle error
            setMode("view");
        }
    };

    console.log(data);

    if (data?.node?.__typename === "Activity") {
        return (
            <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
                <SafeAreaView style={styles.container}>
                    <Formik
                        initialValues={{
                            name: data.node.name,
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
                                    label={t(
                                        "screens.viewEditActivity.activityName"
                                    )}
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    disabled={mode === "view"}
                                    onBlur={handleBlur("name")}
                                    errorMessage={
                                        errors.name && touched.name
                                            ? errors.name
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                />
                                <Input
                                    label={t("description")}
                                    value={
                                        values.description
                                            ? values.description
                                            : ""
                                    }
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                    disabled={mode === "view"}
                                    multiline={true}
                                    numberOfLines={4}
                                    style={styles.textArea}
                                />
                                {mode === "edit" && (
                                    <Button
                                        containerStyle={styles.buttonContainer}
                                        buttonStyle={styles.submitButton}
                                        title={t(
                                            "screens.add_trip.submit_add_trip"
                                        )}
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
                                )}
                            </>
                        )}
                    </Formik>
                    <Button title="edit" onPress={() => setMode("edit")} />
                </SafeAreaView>
            </ScrollView>
        );
    } else {
        return <Text>{t("error.generic")}</Text>;
    }
};

const validationSchema = (
    t: TFunction
): object => //eslint-disable-line
    Yup.object().shape({
        name: Yup.string()
            .min(1)
            .required(t("validation.activityNameRequired")),
    });

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
    textArea: {
        height: 130,
        textAlignVertical: "top",
    },
    iconButton: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: "#BCE1B0",
    },
});

export default ViewEditActivity;
