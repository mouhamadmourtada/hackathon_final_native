
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

import myDrawerItems from '../constants/myDrawerItems';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons'; 


function CustomDrawerContent(props) {
  const seDeconnecter = async (navigation) => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('email');

      navigation.replace('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
    return (
        <>
          <View>
              {/* profil  */}
              <View style = {styles.containerPp}>
                <Image style = {styles.imageProfil} source = {{uri : "https://images.squarespace-cdn.com/content/v1/5dd366b5ac1101724ff2fac7/1574238293109-0UFJN5LRKCJKCU6BJ6EA/man+2.jpg"}} />
                {/* <Ionicons style = {{marginTop: 10, textAlign : 'center'}} name="person-circle" size={150} color="black" /> */}
                <View style = {{flexDirection : 'column', justifyContent: 'center', marginLeft : 10 }}>
                  <Text style = {{fontSize: 14, fontWeight : 700, textAlign : 'center'}}>Mouhamad Mourtada</Text>
                  <Text style = {{fontSize: 14, marginBottom : 10, fontWeight : 700, textAlign : 'center'}}>DIOP</Text>
                </View>

              </View>
          </View>
        <DrawerContentScrollView {...props}>
          {/* <DrawerItemList {...props} /> */}
          
          {myDrawerItems.map((item) => (
            <DrawerItem
                key={item.route}
                label={item.title}
                style = {{ marginHorizontal : 20, marginVertical : 10, }}
                onPress={() => props.navigation.navigate(item.route)}
                
                icon={({ focused, color, size }) => (
                        <AntDesign name={item.icon} size={24} color="black" />
                    )}
            />
            ))}

        </DrawerContentScrollView>
            <TouchableOpacity style = {styles.seDeconnecter}  onPress={()=> seDeconnecter(props.navigation)}>
              <AntDesign name="logout" size={24} color={Colors.main100} style = {{marginRight : 10}} />

              <Text style = {{color : Colors.main100, fontWeight : 500}}>déconnecter</Text>
            </TouchableOpacity>
        
        </>
    );
  }

export default CustomDrawerContent

const styles = StyleSheet.create({
  seDeconnecter : {
    position: 'fixed',
    flexDirection : 'row',
    justifyContent : 'center',
    textAlign : 'center',
    alignItems : 'center',
    padding : 10,
    bottom: 0,
    backgroundColor : Colors.piment,
    fontWeight : 700,
  },
  imageProfil : {
    width: 140,
    height: 140,
    borderRadius : 100,
    marginBottom : 20,
  },
  containerPp : {
    paddingTop : 20,
    justifyContent : 'center',
    alignItems : 'center',
  }
})