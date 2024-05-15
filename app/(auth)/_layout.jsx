import { StyleSheet, Text, View, Pressable } from 'react-native'
import {Link, Slot} from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <View style = {{margintTop : 50}}>
        {/* <Text style = {{fontSize : 50, textAlign : 'center'}}>layout pour auth</Text> */}

        {/* <View style = {{ marginTop : 20}}>

            <Link href="/login" asChild>
                <Pressable style = {{marginTop : 20, backgroundColor : 'blue', width : 200, borderRadius : 5, textAlign : 'center'}}>
                    <Text  style={{color: 'white', marginTop : 10, marginBottom : 10, textAlign : 'center'}} >go to login</Text>
                </Pressable>
            
            </Link>
            
        </View>

        <View style = {{ marginTop : 20}}>
            <Link href="/register" asChild>
                <Pressable style = {{marginTop : 20, backgroundColor : 'blue', width : 200, borderRadius : 5, textAlign : 'center'}}>
                    <Text  style={{color: 'white', marginTop : 10, marginBottom : 10, textAlign : 'center'}} >go to register</Text>
                </Pressable>
            
            </Link>
            
        </View>

        <View style = {{ marginTop : 20}}>
            <Link href="/principal" asChild>
                <Pressable style = {{marginTop : 20, backgroundColor : 'blue', width : 200, borderRadius : 5, textAlign : 'center'}}>
                    <Text  style={{color: 'white', marginTop : 10, marginBottom : 10, textAlign : 'center'}} >Se connecter</Text>
                </Pressable>
            
            </Link>
            
        </View>
         */}

        <Slot />

    </View>
  )
}

export default _layout

const styles = StyleSheet.create({})