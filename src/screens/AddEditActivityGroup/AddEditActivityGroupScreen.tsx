import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { fonts } from "react-native-elements/dist/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import SvgTravelPlan from "../../components/svg/SvgTravelPlan";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { refetchGetTripQuery } from "../Itinerary/types/getTripQuery";
import { useAddActivityGroupMutation } from "./types/add-activity-group.mutation";
import { useRemoveActivityGroupMutation } from "./types/remove-activity-group.mutation";
import { useUpdateActivityGroupMutation } from "./types/update-activity-group.mutation";
import { theme } from "../../theme/theme";

type AddEditActivityGroupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.ADD_EDIT_ACTIVITY_GROUP
>;

type AddEditActivityGroupScreenRouteProp = RouteProp<
    RootStackParamList,
    Routes.ADD_EDIT_ACTIVITY_GROUP
>;

type Props = {
    route: AddEditActivityGroupScreenRouteProp;
    navigation: AddEditActivityGroupScreenNavigationProp;
};

const AddEditActivityGroupScreen = (props: Props): JSX.Element => {
    const { t } = useTranslation();

    const [executeCreate, { error: errorCreate, loading: loadingCreate }] =
        useAddActivityGroupMutation();
    const [executeUpdate, { error: errorUpdate, loading: loadingUpdate }] =
        useUpdateActivityGroupMutation();
    const [executeRemove, { error: errorRemove, loading: loadingRemove }] =
        useRemoveActivityGroupMutation();

    const handleRemove = (): void => {
        console.log("Removing activity group");
        Alert.alert(
            t("screens.addEditActivityGroup.removeDialogTitle"),
            t("screens.addEditActivityGroup.removeDialogMessage"),
            [
                {
                    text: t("cancel"),
                    style: "cancel",
                },
                {
                    text: t("remove"),
                    style: "destructive",
                    onPress: () => {
                        console.log("Remove Pressed");
                        executeRemove({
                            variables: {
                                id: props.route.params.tripRoutePointToEdit?.id ?? "",
                            },
                            refetchQueries: [
                                refetchGetTripQuery({
                                    tripId: props.route.params.tripId,
                                }),
                            ],
                        })
                            .then(() => {
                                console.log("Successfully removed activity group");
                                props.navigation.goBack();
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    },
                },
            ]
        );
    };
    const handleSubmit = (values: FormikValues): void => {
        console.log("Add activity group button pressed");
        if (props.route.params.tripRoutePointToEdit === undefined) {
            console.log("Executing an activity group create");
            executeCreate({
                variables: {
                    input: {
                        tripId: props.route.params.tripId,
                        name: values.name,
                        description: values.description ?? "",
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: props.route.params.tripId,
                    }),
                ],
            })
                .then(() => {
                    console.log("Successfully created activity group");
                    props.navigation.goBack();
                })
                .catch((e) => console.error(e)); // TODO - Notify user
        } else {
            console.log("Executing an activity group update");
            executeUpdate({
                variables: {
                    input: {
                        routePointId: props.route.params.tripRoutePointToEdit.id,
                        name: values.name,
                        description: values.description ?? "",
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: props.route.params.tripId,
                    }),
                ],
            })
                .then(() => {
                    console.log("Successfully updated activity group");
                    props.navigation.goBack();
                })
                .catch((e) => console.error(e)); // TODO - Notify user
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.inner}>
                    {/* Undraw.co: travel plans */}
                    <SvgTravelPlan style={styles.travelPlan} width={150} height={150} />
                    <Text style={theme.fonts.title.style}>
                        {t("screens.addEditActivityGroup.groupYourActivities")}
                    </Text>
                    <Text style={theme.fonts.regular.style}>
                        {t("screens.addEditActivityGroup.explanation")}
                    </Text>
                    <Formik
                        initialValues={
                            props.route.params.tripRoutePointToEdit
                                ? {
                                      name: props.route.params.tripRoutePointToEdit.name ?? "",
                                      description:
                                          props.route.params.tripRoutePointToEdit.description ?? "",
                                  }
                                : {
                                      name: "",
                                      description: "",
                                  }
                        }
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema(t)}
                    >
                        {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
                            <>
                                <Input
                                    label={t("screens.addEditActivityGroup.activityGroupName")}
                                    errorMessage={
                                        errors.name && touched.name ? errors.name : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={t("placeholder.activityGroupName")}
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                />
                                <Input
                                    label={t(
                                        "screens.addEditActivityGroup.activityGroupDescription"
                                    )}
                                    errorMessage={
                                        errors.description && touched.description
                                            ? errors.description
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={t("placeholder.description")}
                                    value={values.description}
                                    onChangeText={handleChange("description")}
                                    onBlur={handleBlur("description")}
                                />
                                {errorCreate && (
                                    <Text style={styles.errorText}>{errorCreate.message}</Text>
                                )}
                                {errorUpdate && (
                                    <Text style={styles.errorText}>{errorUpdate.message}</Text>
                                )}
                                {errorRemove && (
                                    <Text style={styles.errorText}>{errorRemove.message}</Text>
                                )}
                                <Button
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.submitButton}
                                    title={
                                        props.route.params.tripRoutePointToEdit === undefined
                                            ? t("screens.addEditActivityGroup.submitCreate")
                                            : t("screens.addEditActivityGroup.submitUpdate")
                                    }
                                    titleStyle={{
                                        color: "black",
                                        fontSize: 25,
                                    }}
                                    onPress={() => handleSubmit()}
                                    loading={loadingCreate || loadingUpdate}
                                />
                                {props.route.params.tripRoutePointToEdit !== undefined && (
                                    <Button
                                        containerStyle={styles.buttonContainer}
                                        title={t(
                                            "screens.addEditActivityGroup.removeActivityGroup"
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
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const validationSchema = (t: TFunction): any => {
    return Yup.object().shape({
        name: Yup.string().min(1).max(30).required(t("validation.nameRequired")),
        description: Yup.string().min(1).max(200),
    });
};

const styles = StyleSheet.create({
    text: {
        marginBottom: 30,
        alignSelf: "center",
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
    iconButton: {
        marginLeft: 10,
    },
    buttonContainer: {
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: "#BCE1B0",
    },
    travelPlan: {
        alignSelf: "center",
    },
    inner: {
        padding: 20,
        flex: 1,
        justifyContent: "space-around",
    },
});
export default AddEditActivityGroupScreen;
