import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SvgLogo from "../components/SvgLogo";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const passwordList = [
        "V4c47uis",
        "P4ssw0rd",
        "SecurePassword123",
        "not12345678",
        "P455w0rd",
        "4711691337",
    ];
    const mailList = [
        "email@example.com",
        "contact@vacatius.com",
        "TheLegend27@mail.com",
    ];

    const handleLogin = () => {
        console.log(`login with email: ${email}, password: ${password}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SvgLogo style={styles.logo} width={200} height={200} />
            <Text style={styles.text}>{t("register")}</Text>
            <Input
                label={t("email")}
                placeholder={
                    mailList[Math.floor(Math.random() * mailList.length)]
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
                label={t("password")}
                placeholder={
                    passwordList[
                        Math.floor(Math.random() * passwordList.length)
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
            />
            <Button
                containerStyle={styles.buttonContainer}
                type="clear"
                title={t("register")}
                titleStyle={{ color: "darkslategray" }}
                onPress={() => console.log("register")}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        marginTop: 30,
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
