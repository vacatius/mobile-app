import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../components/SvgLogo";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");

    const handleRegister = () => {
        if (password !== password2) {
            return;
        }
        console.log(
            `register with email: ${email}, password: ${password}, username: ${username}`
        );
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled" bounces={false}>
            <SafeAreaView style={styles.container}>
                <SvgLogo style={styles.logo} width={100} height={100} />
                <Input
                    label={t("email")}
                    placeholder={
                        t("placeholder.email", { returnObjects: true })[
                            Math.floor(
                                Math.random() *
                                    t("placeholder.email", {
                                        returnObjects: true,
                                    }).length
                            )
                        ]
                    }
                    leftIcon={
                        <Icon
                            style={styles.icon}
                            name="envelope"
                            size={24}
                            color="black"
                            type="font-awesome-5"
                        />
                    }
                    value={email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />
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
                    value={password}
                    secureTextEntry={true}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
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
                    value={password2}
                    secureTextEntry={true}
                    onChange={(e) => setPassword2(e.nativeEvent.text)}
                />
                <Button
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonLogin}
                    title={
                        t("startJourney", { returnObjects: true })[
                            Math.floor(
                                Math.random() *
                                    t("startJourney", { returnObjects: true })
                                        .length
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
                    onPress={handleRegister}
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
