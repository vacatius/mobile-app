import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RootStackParamList from "../../types/RootStackParamList";
import { Routes } from "../../types/Routes";
import { SafeAreaView, StyleSheet } from "react-native";
import { Formik, FormikValues } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import * as Yup from "yup";
import stc from "string-to-color";
import { useUpdateUserMutationMutation } from "./types/updateUserMutation";
import * as SecureStore from "expo-secure-store";
import SecureStorageItems from "../../types/SecureStorageItems";

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
    const [execute, { error, loading }] = useUpdateUserMutationMutation();
    const [displayName, setDisplayName] = useState(
        props.route.params.user.displayName
    );

    const submit = (values: FormikValues): void => {
        if (
            values.displayName === props.route.params.user.displayName &&
            values.email === props.route.params.user.email &&
            values.password === ""
        ) {
            return;
        }

        execute({
            variables: {
                input: {
                    displayName: values.displayName.trim(),
                    email: values.email.trim(),
                    password: values.password
                        ? values.password.trim()
                        : undefined,
                },
            },
        }).then(async (res) => {
            await SecureStore.setItemAsync(
                SecureStorageItems.CURRENT_USER,
                JSON.stringify(res.data?.updateUser)
            );
            if (res.data?.updateUser) {
                setDisplayName(res.data.updateUser.displayName);
                props.route.params.updateUser(res.data?.updateUser);
            }
        });
    };

    const logout = async (): Promise<void> => {
        console.log("logout");
        console.log(props.route.params.updateUser);
        await SecureStore.deleteItemAsync(SecureStorageItems.CURRENT_USER);
        await SecureStore.deleteItemAsync(SecureStorageItems.ACCESS_TOKEN);
        props.route.params.updateUser(undefined);
        props.navigation.reset({
            routes: [{ name: Routes.LOGIN }],
        });
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
                    title={displayName.charAt(0)?.toUpperCase() ?? "?"}
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
                                label={t("passwordNew")}
                                placeholder={t("passwordNew")}
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
                                label={t("repeatPasswordNew")}
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
                                onPress={() => handleSubmit()}
                                loading={loading}
                            />
                        </>
                    )}
                </Formik>
                <Button
                    title={t("screens.profile.logout")}
                    type="clear"
                    onPress={logout}
                />
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
        password: Yup.string().min(
            8,
            t("validation.password.minLength", { amount: "8" })
        ),
        password2: Yup.string()
            .when("password", {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                is: (val: any) => val?.length > 0,
                then: Yup.string().required(t("validation.password.required")),
            })
            .oneOf([Yup.ref("password."), ""], t("validation.password.match")),
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        margin: 20,
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
