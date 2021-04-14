import Constants from "expo-constants";
import { BACKEND_URL, SITE_KEY } from "@env";

export function getEnvironment() {
    let releaseChannel = Constants.manifest.releaseChannel;
    let develop = {
        envName: "DEVELOPMENT",
        backendUrl: BACKEND_URL,
        siteKey: SITE_KEY,
    };
    let production = {
        envName: "PRODUCTION",
        backendUrl: BACKEND_URL,
        siteKey: SITE_KEY,
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
