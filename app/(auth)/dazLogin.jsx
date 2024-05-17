import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import PhoneInput from "react-native-phone-number-input";
import { FontAwesome } from "@expo/vector-icons";

export default function dazLogin() {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={-100}
        className="h-screen bg-red-400"
        style={{ backgroundColor: "#fff" }}
      >
        <View className="h-screen bg-red-400 justify-center items-center px-5">
          <View
            className="rounded-full flex flex-col justify-center items-center p-4 w-20 h-20 mb-4"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <FontAwesome name="mobile-phone" size={54} color="#00719c" />
          </View>
          <Text className="text-2xl mb-4">Vérification</Text>
          <Text className="text-base text-black">
            Entrez votre numéro de téléphone.
          </Text>
          <Text className="text-sm font-thin">
            Nous vous enverrons un code OTP par SMS
          </Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="SN"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={{
              backgroundColor: "#f3f3f3",
              width: "100%",
              borderRadius: 10,
              padding: 6,
              marginTop: 24,
            }}
          />
          {showMessage && (
            <View className="mt-4">
              <Text className="font-medium" style={{ color: "red" }}>
                Veuillez entrer un numéro de téléphone valide
              </Text>
            </View>
          )}
          <TouchableOpacity
            className="p-3 bg-secondary w-full rounded-full mt-48"
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
              if (!checkValid) return;
              router.push({ pathname: "/(auth)/otpScreen", params: { value } });
            }}
          >
            <Text className="text-center text-2xl text-[#fff]">Vérifier</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
