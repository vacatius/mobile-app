import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Icon, Input, Overlay, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../../components/SvgLogo";
import { useTranslation } from "react-i18next";
import { useCreateUserMutation } from "./types/registerMutation";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { TFunction } from "i18next";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

export default function Register(props: Props) {
    const { t } = useTranslation();
    const [execute, { error, loading }] = useCreateUserMutation();
    const [signInOverlay, setSignInOverlay] = useState("");
    const [placeholder] = useState({
        username: t("placeholder.username", {
            returnObjects: true,
        })[
            Math.floor(
                Math.random() *
                    t("placeholder.username", {
                        returnObjects: true,
                    }).length
            )
        ],
        email: t("placeholder.email", {
            returnObjects: true,
        })[
            Math.floor(
                Math.random() *
                    t("placeholder.email", {
                        returnObjects: true,
                    }).length
            )
        ],
    });

    const handleRegister = (values: FormikValues) => {
        execute({
            variables: {
                input: {
                    username: values.username,
                    displayName: values.displayName,
                    password: values.password,
                    email: values.email,
                    captchaToken: "todo", //TODO
                },
            },
        })
            .then((data) => {
                setSignInOverlay(values.displayName);
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(`register with user ${values.username}`);
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <SafeAreaView style={styles.container}>
                <Overlay
                    isVisible={signInOverlay.length > 0}
                    overlayStyle={styles.overlay}
                >
                    <SvgLogo style={styles.logo} width={80} height={80} />
                    <Text style={styles.welcomeText}>
                        {t("screens.register.welcome", {
                            displayName: signInOverlay,
                        })}
                    </Text>
                    <Button
                        onPress={() => props.navigation.navigate("Login")}
                        title={t("login")}
                        buttonStyle={styles.buttonRegister}
                        containerStyle={styles.buttonContainerWelcome}
                        titleStyle={styles.buttonTitle}
                    />
                </Overlay>
                <SvgLogo style={styles.logo} width={100} height={100} />
                <Formik
                    initialValues={{
                        email: "",
                        username: "",
                        displayName: "",
                        password: "",
                        password2: "",
                    }}
                    onSubmit={(values) => handleRegister(values)}
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
                                label={t("email")}
                                placeholder={placeholder.email}
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
                                label={t("username")}
                                placeholder={placeholder.username}
                                leftIcon={
                                    <Icon
                                        style={styles.icon}
                                        name="user"
                                        size={24}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                value={values.username}
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                errorMessage={
                                    errors.username && touched.username
                                        ? errors.username
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            <Input
                                label={t("displayName")}
                                placeholder={placeholder.username}
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
                                secureTextEntry={true}
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
                                secureTextEntry={true}
                                onChangeText={handleChange("password2")}
                                onBlur={handleBlur("password2")}
                                errorMessage={
                                    errors.password2 && touched.password2
                                        ? errors.password2
                                        : undefined
                                }
                                errorStyle={styles.errorMessage}
                            />
                            {error && (
                                <Text style={styles.errorText}>
                                    {error.message.includes("Invalid")
                                        ? t("error.takenEmailUsername")
                                        : error.networkError
                                        ? t("error.network")
                                        : error.message}
                                </Text>
                            )}
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.buttonRegister}
                                title={
                                    t("startJourney", { returnObjects: true })[
                                        Math.floor(
                                            Math.random() *
                                                t("startJourney", {
                                                    returnObjects: true,
                                                }).length
                                        )
                                    ]
                                }
                                titleStyle={styles.buttonTitle}
                                icon={
                                    <Icon
                                        style={styles.iconButton}
                                        name="umbrella-beach"
                                        size={15}
                                        color="black"
                                        type="font-awesome-5"
                                    />
                                }
                                iconRight={true}
                                loading={loading}
                                onPress={() => handleSubmit()}
                            />
                        </>
                    )}
                </Formik>
            </SafeAreaView>
        </ScrollView>
    );
}

const validationSchema = (t: TFunction): object => {
    return Yup.object().shape({
        email: Yup.string()
            .required(t("validation.emailRequired"))
            .email(t("validation.emailRequired")),
        username: Yup.string().required(t("validation.usernameRequired")),
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