import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import {Slot, Link, router} from 'expo-router'
import DeconnecterService  from '../../services/deconnecter'

const Page = () => {

  const logout = () => {
    console.log('logout')
    DeconnecterService.deconnecter()
    router.navigate('/login')

  }

  return (
    
    <View style = {{marginTop : 50}}>
        
        <Text style = {{fontSize : 50, textAlign : 'center'}}>layout</Text>
        <View style = {{ marginTop : 20}}>
            <Link href="/login" asChild>
                <Pressable style = {{marginTop : 20, backgroundColor : 'blue', width : 200, borderRadius : 5, textAlign : 'center'}}>
                    <Text  style={{color: 'white', marginTop : 10, marginBottom : 10, textAlign : 'center'}} >go to login</Text>
                </Pressable>
            
            </Link>

              <Pressable onPress={logout} style = {{marginTop : 20, backgroundColor : 'red', width : 200, borderRadius : 5, textAlign : 'center'}}>
                  <Text  style={{color: 'white', marginTop : 10, marginBottom : 10, textAlign : 'center'}} >Se déconnecter</Text>
              </Pressable>
            
            
        </View>

        <Slot/>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})