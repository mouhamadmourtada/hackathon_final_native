import React, {useReducer, useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, Button, Pressable, ScrollView, KeyboardAvoidingView,} from 'react-native';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Select from '../../components/Select';
import SwitchComponent from '../../components/Switch';
import InputDate from '../../components/InputDate';
import ButtonMain from '../../components/ButtonMain';
import Error from '../../components/Error';
import {isValidatedUser} from "../../services/validationRegister"
import Loader from '../../components/Loader';
import * as ImagePicker from 'expo-image-picker'
import {router} from 'expo-router'

const initialState = {
    email: '',
    password: '',
    prenom: '',
    nom: '',
    dateNaissance: '',
    lieuNaissance: '',
    adresse : null,
};

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'SET_PRENOM':
        return { ...state, prenom: action.payload };
      case 'SET_NOM':
        return { ...state, nom: action.payload };
      case 'SET_ADDRESS':
        return { ...state, adresse: action.payload };
      case 'SET_LIEUNAISSANCE':
        return { ...state, lieuNaissance: action.payload };
      case 'SET_DATENAISSANCE':
        return { ...state, dateNaissance: action.payload };
      default:
        return state;
    }
  };



const SignUp = ({navigation}) => {

  const [image, setImage] = useState(null);


  const [isLoading, setIsLoading] = useState(false);
  const [isErreur, setIsErreur] = useState(false);


  const [emailErreur, setEmailErreur] = useState('');
  const [passwordErreur, setPasswordErreur] = useState('');
  const [prenomErreur, setPrenomErreur] = useState('');
  const [nomErreur, setNomErreur] = useState('');
  const [adresseErreur, setAdresseErreur] = useState('');
  const [dateNaissanceErreur, setDateNaissanceErreur] = useState('');
  const [lieuNaissanceErreur, setLieuNaissanceErreur] = useState('');

  const annulerErreur = ()=>{
    setEmailErreur("")
    setNomErreur("")
    setPrenomErreur("")
    setPasswordErreur("")
    setAdresseErreur("")
    setDateNaissanceErreur(null)
    setLieuNaissanceErreur("")
  }

  const setErrorsFromServer = (errorObject) => {
    // annulerErreur();
  
    // Parcourir l'objet d'erreur
    for (const key in errorObject) {
      if (errorObject.hasOwnProperty(key)) {
        const errorMessage = errorObject[key][0];
        switch (key) {
          case 'user.email':
            if (errorMessage !== emailErreur) setEmailErreur(errorMessage);
            break;
          case 'user.password':
            if (errorMessage !== passwordErreur) setPasswordErreur(errorMessage);
            break;
          case 'user.prenom':
            if (errorMessage !== prenomErreur) setPrenomErreur(errorMessage);
            break;
          case 'user.nom':
            if (errorMessage !== nomErreur) setNomErreur(errorMessage);
            break;
          case 'user.adresse':
            if (errorMessage !== adresseErreur) setAdresseErreur(errorMessage);
            break;
          case 'user.dateNaissance':
            if (errorMessage !== dateNaissanceErreur) setDateNaissanceErreur(errorMessage);
            break;
          case 'user.lieuNaissance':
            if (errorMessage !== lieuNaissanceErreur) setLieuNaissanceErreur(errorMessage);
            break;
          default:
            break;
        }
      }
    }
  };
  

  const [state, dispatch] = useReducer(reducer, initialState);  

  const handleChangeState = (text, type)=>{
    console.log("date changé")
    dispatch({ type: type, payload: text });
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  // let lesErreurRetour = {};
  // if (route?.params && route?.params.erreurFromServer) {
  //   lesErreurRetour = route?.params.erreurFromServer;
  //   console.log("erreur depuis sign up")
  //   setErrorsFromServer(lesErreurRetour)
    
  // }

  const creerCompte = ()=> {
    setIsLoading(true);

    annulerErreur();
    // console.log(state)

    const validationErrors = isValidatedUser(state);
    if (Object.keys(validationErrors).length > 0) {
      if (validationErrors.email) {
        setEmailErreur(validationErrors.email);
      } else {
        setEmailErreur(null);
      }

      if (validationErrors.password) {
        setPasswordErreur(validationErrors.password);
      } else {
        setPasswordErreur(null);
      }

      if (validationErrors.nom) {
        setNomErreur(validationErrors.nom);
      } else {
        setNomErreur(null);
      }

      if (validationErrors.prenom) {
        setPrenomErreur(validationErrors.prenom);
      } else {
        setPrenomErreur(null);
      }

      

      if (validationErrors.adresse) {
        setAdresseErreur(validationErrors.adresse);
      } else {
        setAdresseErreur(null);
      }

      if (validationErrors.lieuNaissance) {
        setLieuNaissanceErreur(validationErrors.lieuNaissance);
      } else {
        setLieuNaissanceErreur(null);
      }

      if (validationErrors.dateNaissance) {
        setDateNaissanceErreur(validationErrors.dateNaissance);
      } else {
        setDateNaissanceErreur(null);
      }

      setIsLoading(false)
      return;
    }

    const formData = new FormData();
        
    if (image) {
      formData.append('pp', {
        uri: image,
        type: 'image/jpeg', // Le type d'image dépend du format de l'image sélectionnée
        name: 'photo.jpg',
      });
    }

    formData.append("user", state)
    Object.keys(state).forEach((key) => {
      formData.append(`user[${key}]`, state[key]);
    });

    setIsLoading(false);
    console.log("Créer compte")
    router.navigate('/login')
  }
  
  const allerAlogin = ()=>{
    router.navigate('/login')
  }
     
  return (
    <>
      <KeyboardAwareScrollView >
        {isLoading ? 
          <Loader/>
          : <></>
        }
        <View style={styles.princiapal}>
          <Text style = {{marginBottom : 10, color : Colors.main100, fontSize : 40, fontWeight : 700}}>Créer compte</Text>

          <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>

          
          <View style = {{marginBottom : 50}}>
            
            <Input
              placeholder="Email"
              icon="mail"
              value={state.email}
              onChangeText={(text)=> handleChangeState(text, "SET_EMAIL")}
            />
             <Text style = {{color : 'red'}}>
                    {emailErreur}
              </Text>

            <Input
              placeholder="Mot de passe"
              icon="lock"
              value={state.password}
              onChangeText={(text)=> handleChangeState(text, "SET_PASSWORD")}

            />
            <Error>
              {passwordErreur}
            </Error>

            <Input
              placeholder="Prenom"
              icon="user"
              value={state.prenom}
              onChangeText={(text)=> handleChangeState(text, "SET_PRENOM")}
            />
            <Error>
              {prenomErreur}
            </Error>


            <Input
              placeholder="Nom"
              icon="user"
              value={state.nom}
              onChangeText={(text)=> handleChangeState(text, "SET_NOM")}
            />
            <Error>
              {nomErreur}
            </Error>

            <Input
              placeholder="Adresse"
              icon="enviromento"
              value={state.adresse}
              onChangeText={(text)=> handleChangeState(text, "SET_ADDRESS")}
            />
            <Error>
              {adresseErreur}
            </Error>

            
            <View style = {{display : 'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
              <Text style = {{fontWeight : 500}}>
                Date naissance : 
              </Text>
              <InputDate onChangeDate = {(text)=>handleChangeState(text, "SET_DATENAISSANCE")} style = {styles.inputDate}/>        
            </View>
            <Error>
              {dateNaissanceErreur}
            </Error>

            <Input
              placeholder="Lieu de naissance"
              icon="enviromento"
              value={state.lieuNaissance}
              onChangeText={(text)=> handleChangeState(text, "SET_LIEUNAISSANCE")}
            />
            <Error>
              {lieuNaissanceErreur}
            </Error>


            {/* <View style = {{marginTop : 40}}>
              <Select donnees = {postes} onChange = {(text)=>handleChangeState(text, "SET_POSTE")} defaultButtonText = "Sélectionnez votre poste"/>
            </View>
            <Error>
              {posteErreur}
            </Error> */}
          </View>

          <View style = {{ width : 170, alignSelf : 'flex-end' }}>
            <ButtonMain icon="login" title="Valider" onPress={creerCompte}></ButtonMain>
          </View>


          <SwitchComponent onSwitch = {setNomErreur} defaultText = "switcher ma"></SwitchComponent>

          <Pressable style = {{flexDirection : 'row', justifyContent : 'center', alignItems :'center', marginTop : 20}} onPress = {allerAlogin}>
          <Text style = {{fontWeight : 500, color : Colors.second100}}>Vous disposez d'un compte? </Text>
          <Text style = {{fontWeight : 500, color : Colors.main100}}>Se connecter</Text>
          </Pressable>

        </View>

      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    mdButton : {
        color : Colors.second100,
        backgroundColor : Colors.main100,
        height : 45,
        width : 170,
        alignSelf : 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize : 100,
        fontWeight : 500,
        borderRadius : 10,
        marginBottom : 10,
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
      paddingTop : 100, 
      paddingHorizontal : 25, 
      paddingBottom : 20,
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
    inputDate : {
      minWidth : '50%',
    }
  })

export default SignUp;

