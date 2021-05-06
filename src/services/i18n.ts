import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
    en: {
        translation: {
            login: "Login",
            register: "Register",
            email: "Email",
            password: "Password",
            passwordNew: "New Password",
            repeatPassword: "Repeat Password",
            repeatPasswordNew: "Repeat New Password",
            username: "Username",
            description: "Description",
            startJourney: ["Start Journey", "Lets go"],
            displayName: "Display Name",
            tripName: "Trip Name",
            loading: "Loading",
            save: "Save",
            name: "Name",
            cancel: "Cancel",
            remove: "Remove",
            error: {
                network: "No Connection 😢",
                credentials: "Invalid Credentials",
                username: "Invalid Username",
                password: "Invalid Password",
                noDate: "No date.",
                takenEmailUsername:
                    "The Email or Username is already taken, please choose another one",
                generic: "An error occurred",
            },
            placeholder: {
                username: [
                    "Gordon_Freeman",
                    "al1ce",
                    "GLaDOS",
                    "lux69",
                    "j_sparrow",
                    "bender1337",
                ],
                password: [
                    "V4c47uis",
                    "P4ssw0rd",
                    "SecurePassword123",
                    "not12345678",
                    "P455w0rd",
                    "4711691337",
                ],
                email: [
                    "email@example.com",
                    "contact@vacatius.com",
                    "TheLegend27@mail.com",
                ],
                tripName: [
                    "Roadtrip 2022",
                    "Awesome Roadtrip",
                    "Iceland again",
                    "Sun'n'Fun",
                    "Up to Scandinavia",
                ],
                activityGroupName: [
                    "Berlin",
                    "Munich",
                    "Los Angeles",
                    "Amsterdam",
                    "Vancouver",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                activityGroupDescription: [
                    "Monday in Vienna",
                    "Visit all parks",
                    "Sightseeing",
                ],
                description: ["Awesome trip with my friends"],
            },
            validation: {
                emailRequired: "Please enter a valid Email address!",
                usernameRequired: "Please enter a Username!",
                displayNameRequired: "Please enter a display name!",
                password: {
                    required: "Please enter a password!",
                    minLength:
                        "The password must have at least {{amount}} characters",
                    match: "Passwords must match",
                },
                nameRequired: "Please enter a name.",
                descriptionRequired: "Please enter a description.",
            },
            screens: {
                register: {
                    welcome: "Welcome {{displayName}} 🎉",
                },
                add_trip: {
                    title: "Create Trip",
                    trip_name: "Give your trip a name",
                    stay_home: "Stay home",
                    submit_add_trip: "Let's go!",
                },
                dashboard: {
                    title: "Dashboard",
                    currentTrips: "Current Trips",
                    pastTrips: "Past Trips",
                    errors: {
                        noTripsFound: "No past trips found.",
                    },
                },
                shareTrip: {
                    title: "Share a Trip",
                    share: "Share with Friends",
                    planTrip: "Plan Trip",
                    goToDashboard: "Go to Dashboard",
                    androidShareSheetTitle: "Share your Trip with Friends",
                },
                itinerary: {
                    add: "Add Group",
                },
                addEditActivityGroup: {
                    titleCreate: "Add Activity Group",
                    titleUpdate: "Update Activity Group",
                    groupYourActivities: "Group your activities!😀",
                    explanation:
                        "This could be cities 🏙️ that you visit in a road trip 🚗 or weekdays if you stay in one city.",
                    submitCreate: "Add Group",
                    submitUpdate: "Update Group",
                    activityGroupName: "Give your activity group a name",
                    activityGroupDescription: "Add a short description",
                    removeActivityGroup: "Remove Group",
                    removeDialogTitle: "Really remove activity group?",
                    removeDialogMessage:
                        "You will not be able to restore it afterwards. All activities inside will be deleted!",
                },
                profile: {
                    save: "Save",
                    logout: "Logout",
                },
            },
        },
    },
    de: {
        translation: {
            login: "Anmelden",
            register: "Registrieren",
            email: "Email",
            password: "Passwort",
            passwordNew: "Neues Password",
            repeatPassword: "Passwort Wiederholen",
            repeatPasswordNew: "Neues Passwort Wiederholen",
            username: "Benutzername",
            description: "Beschreibung",
            displayName: "Anzeige Name",
            tripName: "Reisename",
            loading: "Wird Geladen",
            save: "Speichern",
            name: "Name",
            cancel: "Abbrechen",
            remove: "Löschen",
            startJourney: ["Reise Starten", "Los gehts"],
            error: {
                network: "Keine Verbindung 😢",
                credentials: "Falsche Benutzerdaten",
                username: "Falscher Benutzername",
                password: "Falsches Passwort",
                takenEmailUsername:
                    "Die Email Adresse oder der Benutzername sind schon vergeben",
                noDate: "Noch kein Datum bekannt.",
                generic: "Ein Fehler ist aufgetreten",
            },
            validation: {
                emailRequired: "Bitte gib eine gültige E-Mail Adresse ein!",
                usernameRequired: "Bitte gib einen Benutzernamen ein!",
                displayNameRequired: "Bitte gib einen Anzeigenamen ein!",
                password: {
                    required: "Bitte gib ein Passwort ein!",
                    minLength:
                        "Das Passwort muss mindestens {{amount}} Zeichen besitzten",
                    match: "Die Passwörter müssen übereinstimmen!",
                },
                tripName: [
                    "Roadtrip 2022",
                    "Toller Roadtrip",
                    "Iceland wieder einmal",
                    "Sun'n'Fun",
                    "Ab nach Skandinavien!",
                ],
                activityGroupName: [
                    "Berlin",
                    "München",
                    "Los Angeles",
                    "Amsterdam",
                    "Vancouver",
                    "Montag",
                    "Dienstag",
                    "Mittwoch",
                    "Donnerstag",
                    "Freitag",
                    "Samstag",
                    "Sonntag",
                ],
                activityGroupDescription: [
                    "Montag in Wien",
                    "Alle Parks besuchen",
                    "Sightseeing",
                ],
                description: ["Cooler roadtrip meinen Freunden"],
                nameRequired: "Bitte gib einen Namen ein!",
                descriptionRequired: "Bitte gib eine Beschreibung Reise ein!",
            },
            screens: {
                register: {
                    welcome:
                        "Willkommen {{displayName}}!\nWir freuen uns dich begrüßen zu dürfen 🎉",
                },
                add_trip: {
                    title: "Neue Reise",
                    trip_name: "Gib deiner Reise einen Namen",
                    stay_home: "Zuhause bleiben",
                    submit_add_trip: "Los geht's!",
                },
                dashboard: {
                    title: "Dashboard",
                    currentJourneys: "Aktuelle Reisen",
                    pastTrips: "Vergangene Reisen",
                    errors: {
                        noTripsFound: "Keine Reisen gefunden.",
                    },
                },
                shareTrip: {
                    title: "Reise teilen",
                    share: "Mit Freunden teilen",
                    planTrip: "Reise planen",
                    goToDashboard: "Zum Dashboard",
                    androidShareSheetTitle: "Teile deine Reise mit Freunden",
                },
                itinerary: {
                    add: " Gruppe Hinzufügen",
                },
                addEditActivityGroup: {
                    titleCreate: "Aktivitätsgruppe hinzufügen",
                    titleUpdate: "Aktivitätsgruppe aktualisieren",
                    groupYourActivities: "Gruppiere deine Aktivitäten!😀",
                    explanation:
                        "Das könnten beispielsweise Städte 🏙️ eines Roadtrips 🚗 sein oder Wochentage wenn du in einer Stadt bleibst.",
                    submitCreate: "Gruppe erstellen",
                    submitUpdate: "Gruppe aktualisieren",
                    activityGroupName: "Gib deiner Gruppe einen Namen",
                    activityGroupDescription:
                        "Füge eine kurze Beschreibung hinzu",
                    removeActivityGroup: "Gruppe löschen",
                    removeDialogTitle: "Aktivitätsgruppe wirklich löschen?",
                    removeDialogMessage:
                        "Du kannst sie nicht wiederherstellen. Alle Aktivitäten darin werden gelöscht!",
                },
                profile: {
                    save: "Speichern",
                    logout: "Abmelden",
                },
            },
        },
    },
};

i18n.use(initReactI18next).init({
    lng: Localization.locale,
    fallbackLng: "en",
    resources,
});

export default i18n;
