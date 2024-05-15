import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Slot, Link, Stack} from 'expo-router'

const _layout = () => {
  return (
    <View>
      <Text>layout loader</Text>
      <Slot></Slot>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({})