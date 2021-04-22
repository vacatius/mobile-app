import { BACKEND_URL, INVITATION_BASE_URL } from "@env";
import Constants from "expo-constants";

type Environment = {
    envName: string;
    backendUrl: string;
    invitationBaseUrl: string;
};

export function getEnvironment(): Environment {
    const { releaseChannel } = Constants.manifest;
    const develop = {
        envName: "DEVELOPMENT",
        backendUrl: BACKEND_URL,
        invitationBaseUrl: INVITATION_BASE_URL,
    };
    const production = {
        envName: "PRODUCTION",
        backendUrl: BACKEND_URL,
        invitationBaseUrl: INVITATION_BASE_URL,
    };

    if (releaseChannel === undefined) {
        // no releaseChannel (is undefined) in dev
        return develop;
    }
    if (releaseChannel.indexOf("prod") !== -1) {
        // matches prod-v1, prod-v2, prod-v3
        return production;
    }

    return develop;
}
