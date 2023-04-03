import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './roundedButton.style';
export default function RoundedButton({onPress, title}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.btn_title}>{title}</Text>
    </TouchableOpacity>
  );
}
