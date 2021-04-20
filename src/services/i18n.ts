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
            description: "Description",
            startJourney: ["Start Journey", "Lets go"],
            displayName: "Display Name",
            tripName: "Trip Name",
            error: {
                network: "No Connection 😢",
                credentials: "Invalid Credentials",
                username: "Invalid Username",
                password: "Invalid Password",
                takenEmailUsername:
                    "The Email or Username is already taken, please choose another one",
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
                tripName: [
                    "Roadtrip 2022",
                    "Awesome Roadtrip",
                    "Iceland again",
                    "Sun'n'Fun",
                    "Up to Scandinavia",
                ],
                description: ["Awesome trip with my friends"],
            },
            validation: {
                emailRequired: "Please enter a valid Email address!",
                usernameRequired: "Please enter a Username!",
                displayNameRequired: "Please enter a display name!",
                password: {
                    required: "Please enter a password!",
                    minLength:
                        "The password must have at least {{amount}} characters",
                    match: "Passwords must match",
                },
                tripNameRequired: "Please enter a name for this trip!",
                descriptionRequired:
                    "Please enter a description for this trip.",
            },
            screens: {
                register: {
                    welcome: "Welcome {{displayName}} 🎉",
                },
                add_trip: {
                    trip_name: "Give your trip a name",
                    stay_home: "Stay home",
                    submit_add_trip: "Let's go!",
                },
            },
            screen_header_trip_dashBoard: "Dashboard",
            screen_header_add_trip: "Add Trip",
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
            description: "Beschreibung",
            displayName: "Anzeige Name",
            tripName: "Trip Name",
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
                tripName: [
                    "Roadtrip 2022",
                    "Toller Roadtrip",
                    "Iceland wieder einmal",
                    "Sun'n'Fun",
                    "Ab nach Skandinavien!",
                ],
                description: ["Cooler roadtrip meinen Freunden"],
                tripNameRequired: "Bitte gib einen Namen für diesen Trip ein!",
                descriptionRequired:
                    "Bitte gib eine Beschreibung für diesen Trip ein!",
            },
            screens: {
                register: {
                    welcome:
                        "Willkommen {{displayName}}!\nWir freuen uns dich begrüßen zu dürfen 🎉",
                },
                add_trip: {
                    trip_name: "Gib deinen Trip einen Namen",
                    stay_home: "Zuhause bleiben",
                    submit_add_trip: "Los geht's!",
                },
            },
            screen_header_add_trip: "Neuer Trip",
        },
    },
};

i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: "en",
    resources,
});

export default i18n;
