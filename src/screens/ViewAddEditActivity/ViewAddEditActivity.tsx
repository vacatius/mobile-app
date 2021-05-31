import RNDateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import ScreenHeader from "../../components/ScreenHeader";
import SvgStrandedTraveller from "../../components/svg/SvgStrandedTraveller";
import { theme } from "../../theme/theme";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { refetchGetTripQuery } from "../Itinerary/types/getTripQuery";
import { useCreateActivityMutation } from "./types/createActivityMutation";
import { useGetActivityLazyQuery } from "./types/getActivityQuery";
import { useRemoveActivityMutation } from "./types/removeActivityMutation";
import { useUpdateActivityMutation } from "./types/updateActivityMutation";

export enum Mode {
    VIEW,
    EDIT,
    ADD,
}

type ViewAddEditActivityScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.VIEW_ADD_EDIT_ACTIVITY
>;

type ViewAddEditActivityRouteProp = RouteProp<RootStackParamList, Routes.VIEW_ADD_EDIT_ACTIVITY>;

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
    const [activityName, setActivityName] = useState(props.route.params.activityName ?? "");
    const [activityDescription, setActivityDescription] = useState("");
    const [activityStartTime, setActivityStartTime] = useState(new Date());
    const [activityStartDate, setActivityStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);

    const [useLazyQueryActivity, { data, called }] = useGetActivityLazyQuery({
        variables: { activityId: activityId },
    });

    const [executeUpdate, { error: errorUpdate, loading: loadingUpdate }] =
        useUpdateActivityMutation();

    const [executeRemove, { error: errorRemove, loading: loadingRemove }] =
        useRemoveActivityMutation();

    const [executeCreate, { error: errorCreate, loading: loadingCreate }] =
        useCreateActivityMutation();

    if (mode !== Mode.ADD && !called) {
        useLazyQueryActivity();
    }

    const getTime = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    useEffect(() => {
        if (data?.node?.__typename === "Activity") {
            setActivityName(data.node.name);
            if (data.node.description) {
                setActivityDescription(data.node.description);
            }
            if (data.node.startDate) {
                setActivityStartTime(new Date(data.node.startDate));
                setActivityStartDate(new Date(data.node.startDate));
            }
        }
    }, [data]);

    useEffect(() => {
        props.navigation.setOptions({
            headerBackTitleVisible: false,
            // eslint-disable-next-line react/display-name
            headerTitle: (headerProps) => (
                <ScreenHeader
                    // eslint-disable-next-line react/prop-types
                    screenTitle={
                        mode === Mode.ADD
                            ? t("screens.viewAddEditActivity.createActivity")
                            : activityName
                    }
                    actionIcon={
                        mode === Mode.VIEW ? (
                            <Icon
                                style={theme.button.primaryButton.icon}
                                name={"pen"}
                                size={20}
                                color="#222"
                                type="font-awesome-5"
                            />
                        ) : undefined
                    }
                    actionCallback={() => setMode(Mode.EDIT)}
                    {...headerProps}
                />
            ),
        });
    }, [mode, activityName]);

    const handleEdit = (values: FormikValues): void => {
        if (data?.node?.__typename === "Activity") {
            const date = new Date(
                activityStartDate.getFullYear(),
                activityStartDate.getMonth(),
                activityStartDate.getDate(),
                activityStartTime.getHours(),
                activityStartTime.getMinutes(),
                activityStartTime.getSeconds()
            );
            executeUpdate({
                variables: {
                    input: {
                        activityId: activityId,
                        name: values.name,
                        description: values.description,
                        linkToDetails: data.node.linkToDetails,
                        startDate: date.toISOString(),
                        endDate: data.node.endDate,
                    },
                },
                refetchQueries: [
                    refetchGetTripQuery({
                        tripId: data.node.trip.id,
                    }),
                ],
            })
                .then(() => setMode(Mode.VIEW))
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
            const date = new Date(
                activityStartDate.getFullYear(),
                activityStartDate.getMonth(),
                activityStartDate.getDate(),
                activityStartTime.getHours(),
                activityStartTime.getMinutes(),
                activityStartTime.getSeconds()
            );
            executeCreate({
                variables: {
                    input: {
                        routePointId: routePointId,
                        name: values.name,
                        description: values.description ?? "",
                        startDate: date.toUTCString(),
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

    const handleStartDateChange = (date: Date): void => {
        setShowStartDate(false);
        setActivityStartDate(date);
    };

    const handleStartTimeChange = (date: Date): void => {
        setShowStartTime(false);
        setActivityStartTime(date);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
                {/* Undraw.co: stranded traveller */}
                <SvgStrandedTraveller style={styles.travelPlan} width={150} height={150} />
                <Formik
                    initialValues={{
                        name: activityName,
                        description: activityDescription,
                    }}
                    enableReinitialize={true}
                    onSubmit={mode === Mode.ADD ? handleAdd : handleEdit}
                    validationSchema={validationSchema(t)}
                >
                    {({ handleChange, values, handleSubmit, errors, touched, handleBlur }) => (
                        <>
                            <Input
                                label={t("screens.viewAddEditActivity.activityName")}
                                labelStyle={theme.fonts.label.style}
                                value={values.name}
                                onChangeText={handleChange("name")}
                                disabled={mode === Mode.VIEW}
                                onBlur={handleBlur("name")}
                                errorMessage={errors.name && touched.name ? errors.name : undefined}
                                errorStyle={styles.errorMessage}
                            />
                            <Input
                                label={t("description")}
                                labelStyle={theme.fonts.label.style}
                                value={values.description ? values.description : ""}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                disabled={mode === Mode.VIEW}
                                multiline={true}
                                numberOfLines={4}
                                style={styles.textArea}
                            />
                            <View style={styles.dateTime}>
                                <Text style={{ ...styles.fromText, ...theme.fonts.label.style }}>
                                    {t("screens.viewAddEditActivity.from")}
                                </Text>
                                <View style={styles.dateTimePickerGroup}>
                                    {(Platform.OS === "android" || mode === Mode.VIEW) && (
                                        <>
                                            <Button
                                                disabled={mode === Mode.VIEW}
                                                buttonStyle={styles.dateButton}
                                                containerStyle={styles.dateButtonContainer}
                                                titleStyle={styles.dateButtonText}
                                                disabledStyle={styles.dateButton}
                                                title={activityStartDate.toLocaleDateString()}
                                                onPress={() => setShowStartDate(true)}
                                            />
                                            <Button
                                                disabled={mode === Mode.VIEW}
                                                buttonStyle={styles.dateButton}
                                                containerStyle={styles.dateButtonContainer}
                                                titleStyle={styles.dateButtonText}
                                                disabledStyle={styles.dateButton}
                                                title={getTime(activityStartTime)}
                                                onPress={() => setShowStartTime(true)}
                                            />
                                        </>
                                    )}
                                    {((Platform.OS === "ios" && mode !== Mode.VIEW) ||
                                        showStartDate) && (
                                        <RNDateTimePicker
                                            value={activityStartDate}
                                            style={styles.dateTimePicker}
                                            onChange={(event, selectedDate) =>
                                                selectedDate
                                                    ? handleStartDateChange(selectedDate)
                                                    : undefined
                                            }
                                        />
                                    )}
                                    {((Platform.OS === "ios" && mode !== Mode.VIEW) ||
                                        showStartTime) && (
                                        <RNDateTimePicker
                                            value={activityStartTime}
                                            mode="time"
                                            style={styles.dateTimePicker}
                                            onChange={(event, selectedDate) =>
                                                selectedDate
                                                    ? handleStartTimeChange(selectedDate)
                                                    : undefined
                                            }
                                        />
                                    )}
                                </View>
                            </View>
                            {errorCreate && (
                                <Text style={styles.errorText}>{errorCreate.message}</Text>
                            )}
                            {errorUpdate && (
                                <Text style={styles.errorText}>{errorUpdate.message}</Text>
                            )}
                            {errorRemove && (
                                <Text style={styles.errorText}>{errorRemove.message}</Text>
                            )}
                            {mode !== Mode.VIEW && (
                                <Button
                                    containerStyle={theme.button.primaryButton.container}
                                    buttonStyle={theme.button.primaryButton.button}
                                    title={t(
                                        mode === Mode.ADD
                                            ? "screens.viewAddEditActivity.submitCreate"
                                            : "screens.viewAddEditActivity.submitUpdate"
                                    )}
                                    titleStyle={theme.button.primaryButton.title}
                                    onPress={() => handleSubmit()}
                                    loading={mode === Mode.ADD ? loadingCreate : loadingUpdate}
                                />
                            )}
                            {mode === Mode.EDIT && (
                                <Button
                                    containerStyle={theme.button.deleteButton.container}
                                    title={t("screens.viewAddEditActivity.removeActivity")}
                                    type="clear"
                                    titleStyle={theme.button.deleteButton.title}
                                    icon={
                                        <Icon
                                            style={theme.button.deleteButton.icon}
                                            name="trash-alt"
                                            size={theme.icon.deleteButton.size}
                                            color={theme.icon.deleteButton.color}
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
    fromText: {
        color: "#879099",
    },
    dateTime: {
        marginLeft: 10,
        marginTop: -5,
    },
    dateTimePickerGroup: {
        flexDirection: "row",
    },
    dateTimePicker: {
        flexGrow: 1,
        margin: 10,
        marginLeft: 0,
        marginBottom: 30,
        fontSize: 20,
    },
    dateButtonContainer: {
        margin: 10,
        marginLeft: 0,
    },
    dateButton: {
        flexGrow: 1,
        margin: 10,
        marginLeft: 0,
        fontSize: 20,
        backgroundColor: "transparent",
    },
    dateButtonText: {
        color: "black",
    },
    travelPlan: {
        alignSelf: "center",
    },
});

export default ViewAddEditActivity;
