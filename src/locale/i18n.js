import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh_CN from "./zh_CH";
import en from "./en";

const resources = {
  zh_CN: {
    translation: zh_CN,
  },

  en: {
    translation: en,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "zh_CN",
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
