import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
    en: {
        translation: {
            vacatius: "Vacatius",
            login: "Login",
            register: "Register",
            email: "Email",
            password: "Password",
            passwordNew: "New password",
            repeatPassword: "Repeat password",
            repeatPasswordNew: "Repeat new password",
            username: "Username",
            description: "Description",
            displayName: "Display Name",
            tripName: "Trip name",
            loading: "Loading",
            save: "Save",
            name: "Name",
            cancel: "Cancel",
            remove: "Remove",
            leave: "Leave",
            startJourney: ["Start Journey", "Let's go"],
            error: {
                network: "No connection 😢",
                credentials: "Invalid credentials",
                username: "Invalid username",
                password: "Invalid password",
                takenEmailUsername:
                    "The email or username is already taken, please choose another one",
                noDate: "No date.",
                generic: "An error occurred",
            },
            placeholder: {
                username: "Username",
                password: "Password",
                email: "Email",
                tripName: "Trip name",
                activityGroupName: "Activity Group name",
                activityGroupDescription: "Description of your Activity Group",
                description: "Description..",
            },
            validation: {
                emailRequired: "Please enter a valid email address!",
                usernameRequired: "Please enter a username!",
                displayNameRequired: "Please enter a display name!",
                password: {
                    required: "Please enter a password!",
                    minLength: "The password must have at least {{amount}} characters",
                    match: "Passwords must match",
                },
                nameRequired: "Please enter a name.",
                descriptionRequired: "Please enter a description.",
            },
            screens: {
                login: {
                    info: "Sign in to start planning your trips!",
                },
                register: {
                    info: "Register to start planning your trips!",
                    welcome: "Welcome {{displayName}} 🎉",
                },
                add_trip: {
                    title: "Create Trip",
                    trip_name: "Give your Trip a name",
                    stay_home: "Stay home",
                    submit_add_trip: "Let's go!",
                },
                dashboard: {
                    title: "Dashboard",
                    currentTrips: "Current Trips",
                    pastTrips: "Past Trips",
                    errors: {
                        noTripsFound: "No past Trips found.",
                    },
                },
                shareTrip: {
                    titleShare: "Share a Trip",
                    share: "Share with Friends",
                    planTrip: "Plan Trip",
                    goToDashboard: "Go to Dashboard",
                    androidShareSheetTitle: "Share your Trip with friends",
                    titleJoin: "Join a Trip",
                    joinTrip: "Join this Trip",
                    cancelJoin: "Decline invitation",
                },
                itinerary: {
                    add: "Add Activity Group",
                },
                addEditActivityGroup: {
                    titleCreate: "Add Activity Group",
                    titleUpdate: "Update Activity Group",
                    groupYourActivities: "Group your Activities! 😀",
                    explanation:
                        "This could be cities 🏙️ that you visit in a road trip 🚗 or weekdays if you stay in one city.",
                    submitCreate: "Add Group",
                    submitUpdate: "Update Group",
                    activityGroupName: "Give your Activity Group a name",
                    activityGroupDescription: "Add a short description",
                    removeActivityGroup: "Remove Group",
                    removeDialogTitle: "Really remove Activity Group?",
                    removeDialogMessage:
                        "You will not be able to restore it afterwards. All Activities inside will be deleted!",
                },
                profile: {
                    save: "Save",
                    logout: "Logout",
                },
                viewAddEditActivity: {
                    activityName: "Activity name",
                    removeActivity: "Remove Activity",
                    submitUpdate: "Update Activity",
                    submitCreate: "Add Activity",
                    createActivity: "Create Activity",
                    removeDialogTitle: "Really remove Activity?",
                    removeDialogMessage: "You will not be able to restore it afterwards!",
                    from: "from",
                    to: "to",
                },
                tripSettings: {
                    tripDetails: "Trip Details",
                    submitUpdate: "Save",
                    members: "Members",
                    leave: {
                        button: "Leave Trip",
                        dialogTitle: "Really leave Trip?",
                        dialogMessage:
                            "You will need to rejoin this Trip using an invitation link!",
                    },
                    removeMember: {
                        dialogTitle: "Really remove Member?",
                        dialogMessage:
                            "The Member '{{displayName}}' will need an invitation link to rejoin!",
                    },
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
            leave: "Verlassen",
            startJourney: ["Reise Starten", "Los gehts"],
            error: {
                network: "Keine Verbindung 😢",
                credentials: "Falsche Benutzerdaten",
                username: "Falscher Benutzername",
                password: "Falsches Passwort",
                takenEmailUsername: "Die Email Adresse oder der Benutzername sind schon vergeben",
                noDate: "Noch kein Datum bekannt.",
                generic: "Ein Fehler ist aufgetreten",
            },
            placeholder: {
                username: "Benutzername",
                password: "Passwort",
                email: "E-Mail",
                tripName: "Name der Reise",
                activityGroupName: "Name der Aktivitätsgruppe",
                activityGroupDescription: "Beschreibung für die Aktivitätsgruppe",
                description: "Beschreibung..",
            },
            validation: {
                emailRequired: "Bitte gib eine gültige E-Mail Adresse ein!",
                usernameRequired: "Bitte gib einen Benutzernamen ein!",
                displayNameRequired: "Bitte gib einen Anzeigenamen ein!",
                password: {
                    required: "Bitte gib ein Passwort ein!",
                    minLength: "Das Passwort muss mindestens {{amount}} Zeichen besitzten",
                    match: "Die Passwörter müssen übereinstimmen!",
                },
                nameRequired: "Bitte gib einen Namen ein!",
                descriptionRequired: "Bitte gib eine Beschreibung für die Reise ein!",
            },
            screens: {
                login: {
                    info: "Melde dich an, um deine Reisen zu planen!",
                },
                register: {
                    info: "Registriere dich, um deine Reisen zu planen",
                    welcome:
                        "Willkommen {{displayName}}!\nWir freuen uns, dich begrüßen zu dürfen 🎉",
                },
                add_trip: {
                    title: "Neue Reise",
                    trip_name: "Gib deiner Reise einen Namen",
                    stay_home: "Zuhause bleiben",
                    submit_add_trip: "Los geht's!",
                },
                dashboard: {
                    title: "Dashboard",
                    currentTrips: "Aktuelle Reisen",
                    pastTrips: "Vergangene Reisen",
                    errors: {
                        noTripsFound: "Keine Reisen gefunden.",
                    },
                },
                shareTrip: {
                    titleShare: "Reise teilen",
                    share: "Mit Freunden teilen",
                    planTrip: "Reise planen",
                    goToDashboard: "Zum Dashboard",
                    androidShareSheetTitle: "Teile deine Reise mit Freunden",
                    titleJoin: "Einladung",
                    joinTrip: "An Reise teilnehmen",
                    cancelJoin: "Einladung ablehnen",
                },
                itinerary: {
                    add: "Aktivitätsgruppe Hinzufügen",
                },
                addEditActivityGroup: {
                    titleCreate: "Aktivitätsgruppe hinzufügen",
                    titleUpdate: "Aktivitätsgruppe aktualisieren",
                    groupYourActivities: "Gruppiere deine Aktivitäten! 😀",
                    explanation:
                        "Das könnten beispielsweise Städte 🏙️ eines Roadtrips 🚗 sein oder Wochentage, wenn du in einer Stadt bleibst.",
                    submitCreate: "Gruppe erstellen",
                    submitUpdate: "Gruppe aktualisieren",
                    activityGroupName: "Gib deiner Gruppe einen Namen",
                    activityGroupDescription: "Füge eine kurze Beschreibung hinzu",
                    removeActivityGroup: "Gruppe löschen",
                    removeDialogTitle: "Aktivitätsgruppe wirklich löschen?",
                    removeDialogMessage:
                        "Du kannst sie nicht wiederherstellen. Alle Aktivitäten darin werden gelöscht!",
                },
                profile: {
                    save: "Speichern",
                    logout: "Abmelden",
                },
                viewAddEditActivity: {
                    activityName: "Aktivitätsname",
                    removeActivity: "Aktivität löschen",
                    submitUpdate: "Aktivität aktualisieren",
                    submitCreate: "Aktivität hinzufügen",
                    removeDialogTitle: "Aktivität wirklich löschen?",
                    createActivity: "Aktivität erstellen",
                    removeDialogMessage: "Du kannst sie nicht wiederherstellen.",
                    from: "von",
                    to: "bis",
                },
                tripSettings: {
                    tripDetails: "Reisedetails",
                    submitUpdate: "Aktualisieren",
                    members: "Mitglieder",
                    leave: {
                        button: "Reise verlassen",
                        dialogTitle: "Reise wirklich verlassen?",
                        dialogMessage:
                            "Du benötigst einen Einladungslink, um dieser Reise wieder beizutreten!",
                    },
                    removeMember: {
                        dialogTitle: "Mitglied wirklich entfernen?",
                        dialogMessage:
                            "Das Mitglied '{{displayName}}' kann nur mit einem Einladungslink wieder beitreten!",
                    },
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
