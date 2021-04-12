import React, { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../../components/SvgLogo";
import { useTranslation } from "react-i18next";

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

export default function Login(props: Props) {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [execute, { data, error, loading }] = useLoginMutation();

    const handleLogin = () => {
        console.log(`login with username: ${username}, password: ${password}`);
        execute({
            variables: { input: { password: password, username: username } },
        })
            .then((res) => {
                console.log(res.data?.login.token);
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
                    placeholder={
                        t("placeholder.username", { returnObjects: true })[
                            Math.floor(
                                Math.random() *
                                    t("placeholder.username", {
                                        returnObjects: true,
                                    }).length
                            )
                        ]
                    }
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
                    onChange={(e) => setUsername(e.nativeEvent.text)}
                />
                <Input
                    label={t("password")}
                    placeholder={
                        t("placeholder.password", { returnObjects: true })[
                            Math.floor(
                                Math.random() *
                                    t("placeholder.password", {
                                        returnObjects: true,
                                    }).length
                            )
                        ]
                    }
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
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                />
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
});
