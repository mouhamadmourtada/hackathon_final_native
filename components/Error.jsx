import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Error = ({children}) => {
  return (
      <Text style = {{color : 'red'}}>{children}</Text>
  )
}

export default Error

const styles = StyleSheet.create({})