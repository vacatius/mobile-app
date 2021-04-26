import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import SvgTravelPlan from "../../components/svg/SvgTravelPlan";
import { TripRoutePoint } from "../../types";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { refetchGetTripQuery } from "../Itinerary/types/getTripQuery";
import { useAddActivityGroupMutation } from "./types/add-activity-group.mutation";
import { useUpdateActivityGroupMutation } from "./types/update-activity-group.mutation";

type AddEditActivityGroupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.ADD_EDIT_ACTIVITY_GROUP
>;

type AddEditActivityGroupScreenRouteProp = RouteProp<
    RootStackParamList,
    Routes.ADD_EDIT_ACTIVITY_GROUP
>;

type Props = {
    tripRoutePointToEdit?: TripRoutePoint;
    route: AddEditActivityGroupScreenRouteProp;
    navigation: AddEditActivityGroupScreenNavigationProp;
};

const AddEditActivityGroupScreen = (props: Props): JSX.Element => {
    const { t } = useTranslation();

    const [
        executeCreate,
        { error: errorCreate, loading: loadingCreate },
    ] = useAddActivityGroupMutation();
    const [
        executeUpdate,
        { error: errorUpdate, loading: loadingUpdate },
    ] = useUpdateActivityGroupMutation();

    const [placeholder] = useState({
        tripName: t("placeholder.activityGroupName", { returnObjects: true })[
            Math.floor(
                Math.random() *
                    t("placeholder.activityGroupName", {
                        returnObjects: true,
                    }).length
            )
        ],
        description: t("placeholder.activityGroupDescription", {
            returnObjects: true,
        })[
            Math.floor(
                Math.random() *
                    t("placeholder.activityGroupDescription", {
                        returnObjects: true,
                    }).length
            )
        ],
    });

    const handleSubmit = (values: FormikValues): void => {
        console.log("Add activity group button pressed");
        if (props.tripRoutePointToEdit === undefined) {
            executeCreate({
                variables: {
                    input: {
                        tripId: props.route.params.tripId,
                        name: values.name,
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
                    console.log("Successfully created activity group");
                    props.navigation.goBack();
                })
                .catch((e) => console.error(e)); // TODO - Notify user
        } else {
            executeUpdate({
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: props.route.params.tripId,
                    }),
                ],
            })
                .then(() => {
                    console.log("Successfully updated activity group");
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: Routes.ITINERARY,
                            },
                        ],
                    });
                })
                .catch((e) => console.error(e)); // TODO - Notify user
        }
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.inner}>
                {/* Undraw.co: travel plans */}
                <SvgTravelPlan
                    style={styles.travelPlan}
                    width={150}
                    height={150}
                />
                <Text h3 style={styles.textHeading}>
                    {t("screens.addEditActivityGroup.groupYourActivities")}
                </Text>
                <Text h4 style={styles.text}>
                    {t("screens.addEditActivityGroup.explaination")}
                </Text>
                <Formik
                    initialValues={{ name: "", description: "" }}
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
                                label={t("name")}
                                errorMessage={
                                    errors.name && touched.name
                                        ? errors.name
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                                placeholder={placeholder.tripName}
                                value={values.name}
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
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
                                value={values.description}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                            />
                            {errorCreate && (
                                <Text style={styles.errorText}>
                                    {errorCreate.message}
                                </Text>
                            )}
                            {errorUpdate && (
                                <Text style={styles.errorText}>
                                    {errorUpdate.message}
                                </Text>
                            )}
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.submitButton}
                                title={
                                    props.tripRoutePointToEdit === undefined
                                        ? t(
                                              "screens.addEditActivityGroup.submitCreate"
                                          )
                                        : t(
                                              "screens.addEditActivityGroup.submitUpdate"
                                          )
                                }
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
                                loading={loadingCreate || loadingUpdate}
                            />
                        </>
                    )}
                </Formik>
            </View>
        </KeyboardAwareScrollView>
    );
};

const validationSchema = (t: TFunction): any => {
    return Yup.object().shape({
        name: Yup.string()
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
    text: {
        marginBottom: 30,
        alignSelf: "center",
    },
    textHeading: {
        marginBottom: 10,
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
        marginBottom: 20,
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
