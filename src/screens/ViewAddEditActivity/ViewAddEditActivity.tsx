import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TFunction } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { Formik, FormikValues } from "formik";
import { refetchGetTripQuery } from "../Itinerary/types/getTripQuery";
import { useCreateActivityMutation } from "./types/createActivityMutation";
import { useGetActivityLazyQuery } from "./types/getActivityQuery";
import { useRemoveActivityMutation } from "./types/removeActivityMutation";
import { useUpdateActivityMutation } from "./types/updateActivityMutation";

export type Mode = "view" | "edit" | "add";

type ViewAddEditActivityScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.VIEW_ADD_EDIT_ACTIVITY
>;

type ViewAddEditActivityRouteProp = RouteProp<
    RootStackParamList,
    Routes.VIEW_ADD_EDIT_ACTIVITY
>;

type Props = {
    route: ViewAddEditActivityRouteProp;
    navigation: ViewAddEditActivityScreenNavigationProp;
};

const ViewAddEditActivity = (props: Props): JSX.Element => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<Mode>(props.route.params.mode);
    const [activityId, setActivityId] = useState(
        props.route.params.activityId ? props.route.params.activityId : ""
    );
    const [activityName, setActivityName] = useState("");
    const [activityDescription, setActivityDescription] = useState("");

    const [useLazyQueryActivity, { data, called }] = useGetActivityLazyQuery({
        variables: { activityId: activityId },
    });

    const [
        executeUpdate,
        { error: ErrorUpdate, loading: loadingUpdate },
    ] = useUpdateActivityMutation();

    const [
        executeRemove,
        { error: errorRemove, loading: loadingRemove },
    ] = useRemoveActivityMutation();

    const [
        executeCreate,
        { error: errorCreate, loading: loadingCreate },
    ] = useCreateActivityMutation();

    if (mode !== "add" && !called) {
        useLazyQueryActivity();
    }

    const getTime = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    };

    useEffect(() => {
        console.log(data);
        if (data?.node?.__typename === "Activity") {
            setActivityName(data.node.name);
            if (data.node.description) {
                setActivityDescription(data.node.description);
            }
        }
    }, [data]);

    const handleEdit = (values: FormikValues): void => {
        if (data?.node?.__typename === "Activity") {
            executeUpdate({
                variables: {
                    input: {
                        activityId: activityId,
                        name: values.name,
                        description: values.description,
                        linkToDetails: data.node.linkToDetails,
                        startDate: data.node.startDate,
                        endDate: data.node.endDate,
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: data.node.trip.id,
                    }),
                ],
            })
                .then(() => setMode("view"))
                .catch((e) => console.log(e)); // TODO handle error
        }
    };

    const handleRemove = (): void => {
        Alert.alert(
            t("screens.viewAddEditActivity.removeDialogTitle"),
            t("screens.viewAddEditActivity.removeDialogMessage"),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("remove"),
                    style: "destructive",
                    onPress: () => {
                        console.log("Remove Activity Pressed");
                        executeRemove({
                            variables: { input: activityId },
                            refetchQueries: [
                                refetchGetTripQuery({
                                    tripId: props.route.params.tripId,
                                }),
                            ],
                        })
                            .then(() => props.navigation.goBack())
                            .catch((e) => console.log(e)); // TODO error handling
                    },
                },
            ]
        );
    };

    const handleAdd = (values: FormikValues): void => {
        const routePointId = props.route.params.activityGroupId ?? "";
        if (routePointId.length > 0) {
            executeCreate({
                variables: {
                    input: {
                        routePointId: routePointId,
                        name: values.name,
                        description: values.description ?? "",
                        startDate: new Date().toUTCString(),
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: props.route.params.tripId,
                    }),
                ],
            })
                .then(() => {
                    console.log("Successfully created activity");
                    props.navigation.goBack();
                })
                .catch(
                    (e) => console.log(e) // TODO handle error
                );
        } else {
            console.log("no activityGroupProvided"); // TODO handle error
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <Formik
                    initialValues={{
                        name: activityName,
                        description: activityDescription,
                    }}
                    enableReinitialize={true}
                    onSubmit={mode === "add" ? handleAdd : handleEdit}
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
                                    "screens.viewAddEditActivity.activityName"
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
                                    values.description ? values.description : ""
                                }
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                disabled={mode === "view"}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textArea}
                            />
                            {mode !== "view" && (
                                <Button
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.submitButton}
                                    title={t(
                                        mode === "add"
                                            ? "screens.viewAddEditActivity.submitCreate"
                                            : "screens.viewAddEditActivity.submitUpdate"
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
                                    loading={loadingUpdate}
                                />
                            )}
                            {mode === "edit" && (
                                <Button
                                    containerStyle={styles.buttonContainer}
                                    title={t(
                                        "screens.viewAddEditActivity.removeActivity"
                                    )}
                                    type="clear"
                                    titleStyle={{
                                        color: "#e03030",
                                    }}
                                    icon={
                                        <Icon
                                            style={styles.iconButton}
                                            name="trash-alt"
                                            size={15}
                                            color="#e03030"
                                            type="font-awesome-5"
                                        />
                                    }
                                    iconRight={true}
                                    onPress={() => handleRemove()}
                                    loading={loadingRemove}
                                />
                            )}
                        </>
                    )}
                </Formik>
                <Button title="edit" onPress={() => setMode("edit")} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const validationSchema = (
    t: TFunction
): object => //eslint-disable-line
    Yup.object().shape({
        name: Yup.string().min(1).required(t("validation.nameRequired")),
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

export default ViewAddEditActivity;
