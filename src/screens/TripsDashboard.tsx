import React from "react";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "../../App";
import ScreenHeader from "../components/ScreenHeader";
import { StackNavigationProp } from "@react-navigation/stack";

type TripsDashboardScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Dashboard"
>;

type Props = {
    navigation: TripsDashboardScreenNavigationProp;
};

export default function TripsDashboard(props: Props) {
    const { t } = useTranslation();
    return <ScreenHeader screenTitle={t("screen_header_trip_dashBoard")} />;
}
