import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { Formik, FormikValues } from "formik";
import { TFunction } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import SvgLogo from "../../components/SvgLogo";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import SecureStorageItems from "../../types/SecureStorageItems";
import { useLoginMutation } from "./types/loginMutation";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    Routes.LOGIN
>;

type LoginRouteProp = RouteProp<RootStackParamList, Routes.LOGIN>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: LoginRouteProp;
};

async function saveInSecureStore(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
}

export default function Login(props: Props): JSX.Element {
    const { t } = useTranslation();
    const [placeholder] = useState({
        username: t("placeholder.username", { returnObjects: true })[
            Math.floor(
                Math.random() *
                    t("placeholder.username", {
                        returnObjects: true,
                    }).length
            )
        ],
        password: t("placeholder.password", { returnObjects: true })[
            Math.floor(
                Math.random() *
                    t("placeholder.password", {
                        returnObjects: true,
                    }).length
            )
        ],
    });
    const [execute, { error, loading }] = useLoginMutation();

    const handleLogin = (values: FormikValues): void => {
        execute({
            variables: {
                input: { password: values.password, username: values.username },
            },
        })
            .then((res) => {
                if (res.data?.login.token) {
                    saveInSecureStore(
                        SecureStorageItems.ACCESS_TOKEN,
                        res.data?.login.token
                    ).catch((e) => console.log(e));
                }
                if (res.data?.login.user) {
                    props.route.params.updateUser(res.data.login.user);

                    saveInSecureStore(
                        SecureStorageItems.CURRENT_USER,
                        JSON.stringify(res.data?.login.user)
                    ).catch((e) => console.log(e));
                }
                props.navigation.replace(Routes.DASHBOARD);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
            <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
                <SafeAreaView style={styles.container}>
                    <SvgLogo style={styles.logo} width={150} height={150} />
                    <Text style={styles.text}>{t("login")}</Text>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        onSubmit={handleLogin}
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
                                    label={t("username")}
                                    errorMessage={
                                        errors.username && touched.username
                                            ? errors.username
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
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
                                />
                                <Input
                                    label={t("password")}
                                    errorMessage={
                                        errors.password && touched.password
                                            ? errors.password
                                            : undefined
                                    }
                                    errorStyle={styles.errorMessage}
                                    placeholder={placeholder.password}
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
                                />
                                {error && (
                                    <Text style={styles.errorText}>
                                        {error.message.includes("credentials")
                                            ? t("error.credentials")
                                            : error.networkError
                                            ? t("error.network")
                                            : error.message}
                                    </Text>
                                )}
                                <Button
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.buttonLogin}
                                    title={t("login")}
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
                                    iconRight
                                    onPress={() => handleSubmit()}
                                    loading={loading}
                                />
                            </>
                        )}
                    </Formik>
                    <Button
                        containerStyle={styles.buttonContainer}
                        type="clear"
                        title={t("register")}
                        titleStyle={{ color: "darkslategray" }}
                        onPress={() =>
                            props.navigation.navigate(Routes.REGISTER)
                        }
                    />
                </SafeAreaView>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
}

const validationSchema = (
    t: TFunction
): object => //eslint-disable-line
    Yup.object().shape({
        username: Yup.string()
            .min(1)
            .required(t("validation.usernameRequired")),
        password: Yup.string()
            .min(1)
            .required(t("validation.password.required")),
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
});
