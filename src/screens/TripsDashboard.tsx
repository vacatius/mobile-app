import React from "react";
import { useTranslation } from "react-i18next";
import ScreenHeader from "../components/ScreenHeader";

export default function Register() {
    const { t } = useTranslation();
    return (
        <ScreenHeader screenTitle={t("screen_header_trip_dashBoard")} />
    )
}