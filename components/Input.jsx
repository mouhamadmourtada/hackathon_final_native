import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Input = ({ placeholder, icon, secureTextEntry, value, onChangeText}) => {

    return (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
          />
          {
            icon ? 
            <AntDesign name={icon} size={24} color="gray" style={styles.inputIcon} />
            : <></>
          }
        </View>
  )

}

export default Input

const styles = StyleSheet.create({
  
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop : 40,
      borderRadius: 5,
      paddingHorizontal: 12,
      backgroundColor : 'white',
      marginBottom : 0,
      paddingBottom : 0,
      // width : "max"
    },
  inputIcon: {
    marginRight: 10,
  },
  input: {
      flex: 1,
      fontSize: 16,
      height : 50,
  
  },
});
