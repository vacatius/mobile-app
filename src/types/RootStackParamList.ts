type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: { refetchNecessary?: boolean } | undefined;
};

export default RootStackParamList;
