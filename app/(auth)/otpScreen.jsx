import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router, useLocalSearchParams } from "expo-router";
import OTPInput from "../../components/OTPinput";
import { Fontisto } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Image } from "expo-image";

export default function otpScreen() {
  const { value } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    // Here you would typically send the OTP to your backend for verification
    router.push("/(home)/");
  };
  useEffect(() => {
    // Afficher le message après 2 secondes
    const showMessageTimeout = setTimeout(() => {
      setMessageVisible(true);

      // Masquer le message après 3 secondes (ou la durée que vous souhaitez)
      const hideMessageTimeout = setTimeout(() => {
        setMessageVisible(false);
      }, 3000);

      // Nettoyer le timeout de masquage du message
      return () => clearTimeout(hideMessageTimeout);
    }, 2000);

    // Nettoyer le timeout d'affichage du message
    return () => clearTimeout(showMessageTimeout);
  }, []);
  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        className="h-screen bg-red-400"
        style={{ backgroundColor: "#fff" }}
      >
        {messageVisible && (
          <Animatable.View
            animation={"bounceInDown"}
            className="absolute top-12 w-[90%] left-6 mx-auto p-2 bg-secondary rounded-xl shadow-sm flex flex-row gap-2 items-center"
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={require("../../assets/images/logo.jpg")}
              contentFit="cover"
            />
            <View className="flex flex-col justify-center items-center gap-2">
              <Text
                style={{ color: "white", fontWeight: "bold" }}
                className="mr-auto text-lg font-bold"
              >
                Takk jokk : Code de vérification
              </Text>
              <Text style={{ color: "white" }} className="w-2/3 mr-auto">
                Votre code de vérification est : 3596. Merci de ne pas le
                partager.
              </Text>
            </View>
          </Animatable.View>
        )}
        <View className="h-screen px-5 justify-center items-center">
          <View
            className="rounded-full flex flex-col justify-center items-center p-4 w-20 h-20 mb-4"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <Fontisto name="email" size={40} color="#00719c" />
          </View>
          <Text className="text-2xl mb-2">Vérification</Text>

          <Text className="text-base text-black text-left mb-4">
            Saisir le code de vérification envoyé au
            <Text className="text-primary font-bold">{" " + value}</Text>
          </Text>
          <OTPInput onChanged={handleOTPChange} />
          <TouchableOpacity
            className="p-3 bg-secondary w-full rounded-full mt-20"
            onPress={handleVerify}
          >
            <Text className="text-center text-2xl text-[#fff]">Vérifier</Text>
          </TouchableOpacity>
          <Text className="font-thin text-sm mt-4">
            Vous n'avez pas reçu de code de vérification ?
            <Text className="text-secondary font-medium">
              {" Renvoyez le code"}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
