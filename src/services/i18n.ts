import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

export const resources = {
      en: {
        translation: {
          "hello_world": "Hello World",
        },
      },
      de: {
        translation: {
          "hello_world": "Hallo Welt",
        },
      },
    };

i18n.use(initReactI18next).init({
  lng: Localization.locale,
  fallbackLng: "en",
  resources,
});

export default i18n;
