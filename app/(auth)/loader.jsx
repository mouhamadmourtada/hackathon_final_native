import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SecureStorageService from '../../services/store'; // Import du service de stockage sécurisé
import {router} from "expo-router"

const Loader = () => {

  useEffect(() => {
    // checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await SecureStorageService.getValue('token'); // Utilisation du service pour récupérer le token

      if (token) {
        router.navigate('/principal'); // Redirection vers la page principale si le token existe
      } else {
        router.navigate('/login'); // Redirection vers la page de connexion si le token n'existe pas
      }
    } catch (error) {
      console.error('Error checking token:', error);
      router.navigate('/login'); // En cas d'erreur, redirection vers la page de connexion par défaut
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
      <Text style={styles.text}>Vérification du token...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Loader;
