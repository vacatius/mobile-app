import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Share, StyleSheet } from "react-native";
import { Avatar, Button, Header, Text } from "react-native-elements";
import SvgLogo from "../../components/SvgLogo";
import RootStackParamList from "../../types/RootStackParamList";

type TripsDashboardScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ShareTrip"
>;

type Props = {
    navigation: TripsDashboardScreenNavigationProp;
};

export default function ShareTrip(props: Props) {
    const { t } = useTranslation();

    const handleSystemShare = async () => {
        try {
            await Share.share({
                message: "Test \nTest",
                url: "https://example.com",
            });
        } catch (error) {
            // TODO - Notify user with error modal
            console.error(error.message);
        }
    };

    return (
        <>
            <Header
                placement={"left"}
                containerStyle={styles.header}
                leftComponent={<Text h2>Roadtrip 2021</Text>}
                rightComponent={
                    <Avatar
                        rounded
                        size="medium"
                        icon={{
                            // TODO - Replace
                            name: "umbrella-beach",
                            type: "font-awesome-5",
                        }}
                        containerStyle={{ backgroundColor: "black" }} // TODO - Replace
                    />
                }
            />
            <ScrollView style={styles.scrollView}>
                <Text h4>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut
                </Text>
                <SvgLogo style={styles.logo} height={150} width={150} />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.shareBtn}
                    title={t("screens.shareTrip.share")}
                    titleStyle={styles.btnTextStyle}
                    onPress={() => handleSystemShare()}
                />
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.planTripBtn}
                    title={t("screens.shareTrip.planTrip")}
                    titleStyle={styles.btnTextStyle}
                    // TODO - Redirect to trip itinerary screen
                    onPress={() => console.log("TODO - Missing redirect")}
                />
                <Button
                    containerStyle={{ marginTop: -10 }}
                    buttonStyle={styles.backToDashboardBtn}
                    title={t("screens.shareTrip.backToDashboard")}
                    titleStyle={{ color: "black", fontSize: 20 }}
                    onPress={() => props.navigation.replace("Dashboard")}
                />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        color: "black",
    },
    scrollView: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    logo: {
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 40,
    },
    btnContainer: {
        marginBottom: 15,
    },
    btnTextStyle: {
        color: "black",
        fontSize: 25,
    },
    shareBtn: {
        backgroundColor: "#93C3FE",
    },
    planTripBtn: {
        backgroundColor: "#BCE1B0",
    },
    backToDashboardBtn: {
        backgroundColor: "transparent",
    },
});
