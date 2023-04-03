import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './textInput.style';
export default function Input({placeholder, onChangeText, onBlur, value}) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      onBlur={onBlur}
      values={value}
      placeholder={placeholder}
    />
  );
}
