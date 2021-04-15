import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

export const resources = {
    en: {
        translation: {
            login: "Login",
            register: "Register",
            email: "Email",
            password: "Password",
            repeatPassword: "Repeat Password",
            username: "Username",
            startJourney: ["Start Journey", "Lets go"],
            displayName: "Display Name",
            error: {
                network: "No Connection 😢",
                credentials: "Invalid Credentials",
                username: "Invalid Username",
                password: "Invalid Password",
                takenEmailUsername:
                    "The Email or username is already taken, please choose another one",
            },
            placeholder: {
                username: [
                    "Gordon_Freeman",
                    "al1ce",
                    "GLaDOS",
                    "lux69",
                    "j_sparrow",
                    "bender1337",
                ],
                password: [
                    "V4c47uis",
                    "P4ssw0rd",
                    "SecurePassword123",
                    "not12345678",
                    "P455w0rd",
                    "4711691337",
                ],
                email: [
                    "email@example.com",
                    "contact@vacatius.com",
                    "TheLegend27@mail.com",
                ],
            },
            validation: {
                emailRequired: "Please enter a valid email address!",
                usernameRequired: "Please enter a username!",
                displayNameRequired: "Please enter a display name!",
                password: {
                    required: "Please enter a password!",
                    minLength:
                        "The password must have at least {{amount}} characters",
                    match: "Passwords must match",
                },
            },
            screens: {
                register: {
                    welcome: "Welcome {{displayName}} 🎉",
                },
            },
            screen_header_trip_dashBoard: "Dashboard",
        },
    },
    de: {
        translation: {
            login: "Anmelden",
            register: "Registrieren",
            email: "Email",
            password: "Passwort",
            repeatPassword: "Passwort Wiederholen",
            username: "Benutzername",
            displayName: "Anzeige Name",
            startJourney: ["Reise Starten", "Los gehts"],
            error: {
                network: "Keine Verbindung 😢",
                credentials: "Falsche Benutzerdaten",
                username: "Falscher Benutzername",
                password: "Falsches Passwort",
                takenEmailUsername:
                    "Die Email Adresse oder der Benutzername sind schon vergeben",
            },
            validation: {
                emailRequired: "Bitte gib eine gültige E-Mail Adresse ein!",
                usernameRequired: "Bitte gib einen Benutzernamen ein!",
                displayNameRequired: "Bitte gib einen Anzeigenamen ein!",
                password: {
                    required: "Bitte gib ein Passwort ein!",
                    minLength:
                        "Das Passwort muss mindestens {{amount}} Zeichen besitzten",
                    match: "Die Passwörter müssen übereinstimmen!",
                },
            },
            screens: {
                register: {
                    welcome:
                        "Willkommen {{displayName}}!\nWir freuen uns dich begrüßen zu dürfen 🎉",
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: "en",
    resources,
});

export default i18n;
