import { StyleSheet } from "react-native";

export const theme = {
    fonts: {
        title: StyleSheet.create({
            style: {
                marginBottom: 10,
                alignSelf: "center",
                fontSize: 32,
                fontWeight: "bold",
            },
        }),
        subtitle: StyleSheet.create({
            style: {
                marginBottom: 10,
                alignSelf: "center",
                fontSize: 32,
            },
        }),
        regular: StyleSheet.create({
            style: {
                marginBottom: 10,
                alignSelf: "center",
                fontSize: 25,
            },
        }),
        label: StyleSheet.create({
            style: {
                marginBottom: 10,
                alignSelf: "center",
                fontSize: 25,
            },
        }),
    },
};
