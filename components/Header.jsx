import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style = {styles.header}>
        {/* il faut me mettre un Header bien stylisé */}
        {/* generate me a Header good styled */}
        <Text>Header</Text>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'red',
        padding: 10,
        color: 'white'
    }
})