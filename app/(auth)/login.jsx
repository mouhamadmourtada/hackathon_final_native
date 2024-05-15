// import { StyleSheet, Text, View } from 'react-native'
import {View, Text, StyleSheet, SafeAreaView, Pressable, ActivityIndicator} from 'react-native';
import React, {useState} from 'react'
import Input from '../../components/Input';
import * as SecureStore from 'expo-secure-store';
import { validate } from '../../services/validationLogin';
import ButtonMain from '../../components/ButtonMain';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import {router} from "expo-router"
import SecureStorageService  from '../../services/store';
// import SignInWith from '../../components/SignInWith';

/*
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { login } from '../api/auth';
import { MaterialIcons } from '@expo/vector-icons';
*/

const login = () => {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isErreur, setIsErreur] = useState(false);
  const [erreurMessage, setErreurMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailErreur, setEmailErreur] = useState('');
  const [passwordErreur, setPasswordErreur] = useState("");


  const seconnecter = async() => {
    console.log("se connecter")
    try {
      // Définir une nouvelle clé 'token' avec une valeur factice (par exemple, 'myTokenValue')
      await SecureStorageService.setItem('token', 'myTokenValue');
      router.navigate("/principal"); // Rediriger vers la page principale après avoir défini le token
    } catch (error) {
      console.error('Failed to set value in SecureStorageService:', error);
    }
    // router.navigate("/principal")

    // setIsErreur(false)
    // try {
    //   setIsLoading(true);
    //   setEmailErreur("")
    //   setPasswordErreur("")
    //   const validationErrors = validate(username, password);
    //   if (Object.keys(validationErrors).length > 0) {
    //     // Il y a des erreurs de validation
    //     if (validationErrors.email) {
    //       setEmailErreur(validationErrors.email);
    //     } else {
    //       setEmailErreur(null);
    //     }
  
    //     if (validationErrors.password) {
    //       setPasswordErreur(validationErrors.password);
    //     } else {
    //       setPasswordErreur(null);
    //     }
    //     setIsLoading(false)
    //     return;
    //   }
      

    //   const data = await login(username, password);
  
    //   const token = data.authorization.token;
    //   const email = data.user.email;
  
    //   await SecureStore.setItemAsync('token', token);
    //   await SecureStore.setItemAsync('email', email);
    //   await SecureStore.setItemAsync('user', JSON.stringify(data.user));
  
    //   console.log("Requête faite, authentification réussie !");
      
    //   router.replace('principal');
    // } catch (error) {
    //     setIsErreur(true)
    //     const mdMessage = error.message.split(': ')[1]
    //     if (mdMessage === "incorrect") {
    //         setErreurMessage("email ou mot de passe incorrectes !")
    //     } else if (mdMessage === "profil") {
    //         setErreurMessage("Votre profil est en cours d'étude")
    //     } else {
    //         setErreurMessage("Erreur s'est produit ! Veuillez réessayer plus tard")

    // }
    // setIsLoading(false)
    // }
  };
  
  const creeCompte = ()=>{
    router.navigate('/register')
  }
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const forgetPassword = ()=>{
    console.log("forget mot de passe cliqué !")
    router.navigate('forgetPassword')
  }
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
      <KeyboardAwareScrollView enableOnAndroid={true}
          contentContainerStyle={styles.scrollContent}
          extraScrollHeight={-100}
      >
          {false ? 
              <Loader/>
              : <></>
          }
          <View style={styles.princiapal}>

              <Text style = {{marginBottom : 10, color : Colors.main100, fontSize : 40, fontWeight : 700}}>LOGIN</Text>
              
              {isErreur ? 
              <View style = {styles.errorMessage}>
                  <Text style = {styles.errorMessageText}>
                      {erreurMessage}
                  </Text>
                      <MaterialIcons name="error-outline" size={20} color="red" />
              </View> 
              : <></> }


              <View style = {{marginBottom : 50}}>
              
              <Input
                  placeholder="Email"
                  icon="mail"
                  value={username}
                  onChangeText={handleUsernameChange}
              />
              <Text style = {{color : 'red'}}>
                  {emailErreur}
              </Text>
              
              <Input
                  secureTextEntry = {true}
                  placeholder="Mot de passe"
                  icon="lock"
                  value={password}
                  onChangeText={handlePasswordChange}
              />
              <Text style = {{color : 'red'}}>
                  {passwordErreur}
              </Text>

              <Pressable style = {styles.forget} onPress = {forgetPassword}>
                  <Text style = {{color : Colors.second100, fontWeight : 500, textDecorationLine : 'underline'}}>Mot de passe oublié ?</Text>
              </Pressable>

              </View>



              
              <ButtonMain icon="login" title="CONNEXION" onPress={seconnecter}></ButtonMain>


              {/* <SignInWith/> */}

              <Pressable style = {{flexDirection : 'row', justifyContent : 'center', alignItems :'center'}} onPress = {creeCompte}>
              <Text style = {{fontWeight : 500, color : Colors.second100}}>Nouveau? </Text>
              <Text style = {{fontWeight : 500, color : Colors.main100}}>Créer un compte</Text>
              </Pressable>

          </View>
      </KeyboardAwareScrollView>
  );
}

export default login

const styles = StyleSheet.create({
  mdButton : {
      color : Colors.second100,
      backgroundColor : Colors.main100,
      height : 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize : 100,
      fontWeight : 500,
      borderRadius : 10,
  },
  mdText : {
      fontSize : 20,
      backgroundColor : Colors.main100,
      // ne refléchissez pas trop, c'était juste pour tester
  },
  mdInput : {
    color : Colors.main100,
    backgroundColor : Colors.blanc,
    marginTop : 40,
    
  },
  princiapal : {
    paddingTop : 150, 
    paddingHorizontal : 25, 
    backgroundColor : Colors.blancPrincipal,
    flex : 1
  },
  icon: {
    marginRight: 8,
    color : Colors.main100
  },
  input: {
    flex: 1,
    fontSize: 16,
    height : 50,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop : 40,
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor : 'white',
    marginBottom : 0,
    paddingBottom : 0,
  },
  forget : {
    justifyContent : 'flex-end', 
    alignItems : 'flex-end', 
    marginTop : 10,
    paddingTop : 0 
  },
  errorMessage : {
      backgroundColor: "#ffe4e4",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      display : "flex",
      alignItems : 'center',
      flexDirection : "row",
      justifyContent : "space-between"
  }, 
  errorMessageText : {
      color: "red",
      fontWeight : 600,
      fontSize: 16,
      textAlign: "center",
      marginRight : 10,
  },
  loaderOverlay : {
      // backgroundColor : 'red',
      height : "100%",
      position : "absolute",
      display : "flex",
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : Colors.main30,
      zIndex : 10,
      width : "100%",
  }, 
  scrollContent: {
      flexGrow: 1,
      paddingBottom: 0, // Ajustez cette valeur selon vos besoins
  },
  
})