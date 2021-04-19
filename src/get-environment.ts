import Constants from "expo-constants";
import { BACKEND_URL } from "@env";

export function getEnvironment() {
    const { releaseChannel } = Constants.manifest;
    const develop = {
        envName: "DEVELOPMENT",
        backendUrl: BACKEND_URL,
    };
    const production = {
        envName: "PRODUCTION",
        backendUrl: BACKEND_URL,
    };

    if (releaseChannel === undefined) {
        // no releaseChannel (is undefined) in dev
        return develop; // dev env settings
    }
    if (releaseChannel.indexOf("prod") !== -1) {
        // matches prod-v1, prod-v2, prod-v3
        return production;
    }
}
