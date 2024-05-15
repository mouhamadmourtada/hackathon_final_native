import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';


const ButtonMain = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style = {styles.mdButton}>
    <Text style = {{fontSize : 17, fontWeight : 500, color : Colors.blanc}}>{title}</Text>
    <AntDesign name={icon} size={24} color={Colors.blanc} style = {{marginLeft : 30}} />
    </TouchableOpacity>
  )
}

export default ButtonMain

const styles = StyleSheet.create({
    mdButton : {
        color : Colors.second100,
        backgroundColor : Colors.main100,
        height : 45,
        // alignSelf : 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize : 100,
        fontWeight : 500,
        borderRadius : 10,
        marginBottom : 10,
    },
})