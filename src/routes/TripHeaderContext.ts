import React from "react";
import { Mode } from "../screens/TripSettings/TripSettings";

type TripHeaderContextContent = {
    settingsMode: Mode;
    setSettingsMode: (settingsMode: Mode) => void;
    title: string;
    setTitle: (title: string) => void;
};

const TripHeaderContext = React.createContext<Partial<TripHeaderContextContent>>({});

export default TripHeaderContext;
