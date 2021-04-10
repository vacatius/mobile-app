import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from "react-native-elements";
import {useTranslation} from "react-i18next";
import i18n from './src/services/i18n';
const initI18n = i18n;


export default function App() {
    const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('hello_world')}</Text>
      <Icon
          reverse
          name='beer'
          type='font-awesome-5'
          color='#f50'
          onPress={() => i18n.changeLanguage("en")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
