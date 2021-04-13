import React, { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../../components/SvgLogo";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { useLoginMutation } from "./types/loginMutation";

type ProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

async function saveInSecureStore(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export default function Login(props: Props) {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [placeholder, setPlaceholder] = useState({
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

    const handleLogin = () => {
        if (username === "") {
            setUsernameError(t("error.username"));
        }
        if (password === "") {
            setPasswordError(t("error.password"));
        }
        if (password === "" || username === "") {
            return;
        }

        execute({
            variables: { input: { password: password, username: username } },
        })
            .then((res) => {
                if (res.data?.login.token) {
                    saveInSecureStore(
                        "accessToken",
                        res.data?.login.token
                    ).catch((e) => console.log(e));
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <SafeAreaView style={styles.container}>
                <SvgLogo style={styles.logo} width={150} height={150} />
                <Text style={styles.text}>{t("login")}</Text>
                <Input
                    label={t("username")}
                    errorMessage={usernameError}
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
                    value={username}
                    onChange={(e) => {
                        setUsername(e.nativeEvent.text);
                        if (usernameError) {
                            setUsernameError("");
                        }
                    }}
                />
                <Input
                    label={t("password")}
                    errorMessage={passwordError}
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
                    value={password}
                    secureTextEntry={true}
                    onChange={(e) => {
                        setPassword(e.nativeEvent.text);
                        if (passwordError) {
                            setPasswordError("");
                        }
                    }}
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
                    titleStyle={{ color: "black", fontSize: 25 }}
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
                    onPress={handleLogin}
                    loading={loading}
                />
                <Button
                    containerStyle={styles.buttonContainer}
                    type="clear"
                    title={t("register")}
                    titleStyle={{ color: "darkslategray" }}
                    onPress={() => props.navigation.navigate("Register")}
                />
            </SafeAreaView>
        </ScrollView>
    );
}

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
