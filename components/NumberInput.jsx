import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const NumberInput = ({ placeholder, value, onChangeText}) => {

    return (
        <View style={styles.inputContainer}>
            <Text style = {{color : Colors.second100, fontWeight : 700}}>{placeholder}</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
          />
          
        </View>
  )

}

export default NumberInput

const styles = StyleSheet.create({
  
  inputContainer: {
      marginTop : 40,
      marginBottom : 0,
      paddingBottom : 0,
    },
  inputIcon: {
    marginRight: 10,
  },
  input: {
      flex: 1,
      fontSize: 16,
      height : 40,
      backgroundColor : 'white',
      paddingVertical : 3,
      paddingHorizontal : 10,
      borderRadius : 5,
      marginTop : 3
  },
  placeholder : {
    color : Colors.second100
  }
});