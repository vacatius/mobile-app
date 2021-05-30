import { StyleSheet } from "react-native";

export const theme = {
    fonts: {
        title: StyleSheet.create({
            style: {
                marginBottom: 30,
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
                fontSize: 20,
            },
        }),
        regularCenter: StyleSheet.create({
            style: {
                marginBottom: 10,
                fontSize: 20,
                textAlign: "center",
            },
        }),
        label: StyleSheet.create({
            style: {
                fontSize: 16,
                fontWeight: "normal",
            },
        }),
    },
    button: {
        primaryButton: StyleSheet.create({
            title: {
                color: "black",
                fontSize: 25,
            },
            button: {
                backgroundColor: "#BCE1B0",
            },
            container: {
                marginBottom: 5,
            },
            icon: {
                marginLeft: 10,
            },
        }),
        secondaryButton: StyleSheet.create({
            title: {
                color: "black",
                fontSize: 25,
            },
            button: {
                backgroundColor: "#93C3FE",
            },
            container: {
                marginBottom: 5,
            },
            icon: {
                marginLeft: 10,
            },
        }),
        tertiaryButton: StyleSheet.create({
            title: {
                color: "darkslategray",
            },
            container: {
                marginBottom: 5,
            },
            icon: {
                marginLeft: 10,
            },
        }),
        deleteButton: StyleSheet.create({
            title: {
                color: "#e03030",
            },
            container: {
                marginBottom: 5,
            },
            icon: {
                marginLeft: 10,
            },
        }),
    },
    view: {
        container: {
            spacing: 20,
        },
    },
    icon: {
        input: {
            color: "grey",
            size: 24,
        },
        primaryButton: {
            color: "black",
            size: 15,
        },
        deleteButton: {
            color: "#e03030",
            size: 15,
        },
    },
};
