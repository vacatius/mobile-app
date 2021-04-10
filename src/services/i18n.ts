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
        },
    },
    de: {
        translation: {
            login: "Anmelden",
            register: "Registrieren",
            email: "Email",
            password: "Passwort",
        },
    },
};

i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: "en",
    resources,
});

export default i18n;
