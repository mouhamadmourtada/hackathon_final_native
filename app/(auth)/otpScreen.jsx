import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams } from "expo-router";
import OTPInput from "../../components/OTPinput";
import { Fontisto } from "@expo/vector-icons";
export default function otpScreen() {
  const { value } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    // Here you would typically send the OTP to your backend for verification
    console.log(otp);
    Alert.alert("OTP Verified", "Move to the next screen " + otp);
  };
  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={-100}
        className="h-screen bg-red-400"
        style={{ backgroundColor: "#fff" }}
      >
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
