import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { Image } from "react-native-elements/dist/image/Image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log(`login with email: ${email}, password: ${password}`);
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: "https://placekitten.com/400/400" }}
                style={{ width: 200, height: 200 }}
                containerStyle={{ alignSelf: "center", marginBottom: 20 }}
            />
            <Text style={styles.text}>Login</Text>
            <Input
                label="Email"
                placeholder="mail@example.com"
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
                label="Password"
                placeholder="Password"
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
                title="Login"
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
                title="Register"
                titleStyle={{ color: "darkslategray" }}
                onPress={() => console.log("register")}
            />
        </View>
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
});
