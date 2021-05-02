import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Avatar, Button, Icon, Input, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Formik, FormikValues } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import * as Yup from "yup";
import stc from "string-to-color";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.PROFILE
>;

type ProfileRouteProp = RouteProp<RootStackParamList, Routes.PROFILE>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileRouteProp;
};

const Profile = (props: Props): JSX.Element => {
    const { t } = useTranslation();

    const submit = (values: FormikValues): void => {
        console.log(values);
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <SafeAreaView style={styles.container}>
                <Avatar
                    rounded
                    containerStyle={{
                        backgroundColor: stc(props.route.params.user.id),
                        marginRight: "auto",
                        marginLeft: "auto",
                        marginBottom: 20,
                    }}
                    size="xlarge"
                    title={
                        props.route.params.user.displayName
                            .charAt(0)
                            ?.toUpperCase() ?? "?"
                    }
                />
                <Formik
                    initialValues={{
                        email: props.route.params.user.email,
                        displayName: props.route.params.user.displayName,
                        password: "",
                        password2: "",
                    }}
                    onSubmit={(values) => submit(values)}
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
                                label={t("displayName")}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="user"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.displayName}
                                onChangeText={handleChange("displayName")}
                                onBlur={handleBlur("displayName")}
                                errorMessage={
                                    errors.displayName && touched.displayName
                                        ? errors.displayName
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            <Input
                                label={t("email")}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="envelope"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                errorMessage={
                                    errors.email && touched.email
                                        ? errors.email
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            <Input
                                label={t("password")}
                                placeholder={t("password")}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="lock"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.password}
                                secureTextEntry
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                errorMessage={
                                    errors.password && touched.password
                                        ? errors.password
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            <Input
                                label={t("repeatPassword")}
                                placeholder={t("password")}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="lock"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.password2}
                                secureTextEntry
                                onChangeText={handleChange("password2")}
                                onBlur={handleBlur("password2")}
                                errorMessage={
                                    errors.password2 && touched.password2
                                        ? errors.password2
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.buttonRegister}
                                title={t("screens.profile.save")}
                                titleStyle={styles.buttonTitle}
                                iconRight
                                onPress={() => handleSubmit()}
                            />
                        </>
                    )}
                </Formik>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const validationSchema = (
    t: TFunction
): object => // eslint-disable-line
    Yup.object().shape({
        email: Yup.string()
            .required(t("validation.emailRequired"))
            .email(t("validation.emailRequired")),
        displayName: Yup.string().required(t("validation.displayNameRequired")),
        password: Yup.string()
            .required(t("validation.password.required"))
            .min(8, t("validation.password.minLength", { amount: "8" })),
        password2: Yup.string()
            .required(t("validation.password.required"))
            .oneOf(
                [Yup.ref("password."), null],
                t("validation.password.match")
            ),
    });

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
    buttonContainerWelcome: {
        margin: 20,
    },
    buttonRegister: {
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
    overlay: {
        minWidth: "80%",
        margin: 30,
        padding: 20,
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 20,
    },
    buttonTitle: {
        color: "black",
        fontSize: 25,
    },
});

export default Profile;
