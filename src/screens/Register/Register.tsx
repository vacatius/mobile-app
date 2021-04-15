import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../../components/SvgLogo";
import { useTranslation } from "react-i18next";
import ReCaptchaV3 from "@haskkor/react-native-recaptchav3";
import { getEnvironment } from "../../get-environment";
import { useCreateUserMutation } from "./types/registerMutation";
import { Formik } from "formik";
import * as Yup from "yup";
import { TFunction } from "i18next";

export default function Register() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [token, setToken] = useState("");
    const [execute, { error, loading }] = useCreateUserMutation();
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

    const handleRegister = () => {
        if (password !== password2) {
            return;
        }
        execute({
            variables: {
                input: {
                    username: username,
                    displayName: displayName,
                    password: password,
                    email: email,
                    captchaToken: token,
                },
            },
        });
        console.log(
            `register with email: ${email}, password: ${password}, username: ${username}`
        );
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <ReCaptchaV3
                captchaDomain={"https://vacatius.com"}
                siteKey={getEnvironment()?.siteKey as string}
                onReceiveToken={(token: string) => setToken(token)}
                action="submit"
            />
            <SafeAreaView style={styles.container}>
                <SvgLogo style={styles.logo} width={100} height={100} />
                <Formik
                    initialValues={{
                        email: "",
                        username: "",
                        displayName: "",
                        password: "",
                        password2: "",
                    }}
                    onSubmit={(values) => console.log(values)}
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
                                // onChange={(e) => setEmail(e.nativeEvent.text)}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                errorMessage={
                                    errors.email && touched.email
                                        ? errors.email
                                        : undefined
                                }
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
                                // onChange={(e) =>
                                //     setUsername(e.nativeEvent.text)
                                // }
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                errorMessage={
                                    errors.username && touched.username
                                        ? errors.username
                                        : undefined
                                }
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
                                // onChange={(e) =>
                                //     setDisplayName(e.nativeEvent.text)
                                // }
                                onChangeText={handleChange("displayName")}
                                onBlur={handleBlur("displayName")}
                                errorMessage={
                                    errors.displayName && touched.displayName
                                        ? errors.displayName
                                        : undefined
                                }
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
                                // onChange={(e) =>
                                //     setPassword(e.nativeEvent.text)
                                // }
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                errorMessage={
                                    errors.password && touched.password
                                        ? errors.password
                                        : undefined
                                }
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
                                // onChange={(e) =>
                                //     setPassword2(e.nativeEvent.text)
                                // }
                                onChangeText={handleChange("password2")}
                                onBlur={handleBlur("password2")}
                                errorMessage={
                                    errors.password2 && touched.password2
                                        ? errors.password2
                                        : undefined
                                }
                            />
                            <Button
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.buttonLogin}
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
                                titleStyle={{ color: "black", fontSize: 25 }}
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
                                disabled={!isValid || isSubmitting}
                                loading={isSubmitting}
                                // onPress={handleRegister}
                                onPress={() => handleSubmit}
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
        email: Yup.string().required(t("validation.emailRequired")).email(),
        username: Yup.string().required(t("validation.usernameRequired")),
        displayName: Yup.string().required(t("validation.displayNameRequired")),
        password: Yup.string()
            .required(t("validation.password.required"))
            .min(4, t("validation.password.minLength", { amount: "4" })),
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
    buttonLogin: {
        backgroundColor: "#BCE1B0",
    },
    logo: {
        alignSelf: "center",
        marginBottom: 20,
    },
});
