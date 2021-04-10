import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Icon} from "react-native-elements";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Icon
          reverse
          name='beer'
          type='font-awesome-5'
          color='#f50'
          onPress={() => console.log('hello')} />
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
