import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function dazLogin() {
  const [nin, setNin] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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
            {/* <FontAwesome name="mobile-phone" size={54} color="#00719c" /> */}
            <AntDesign name="idcard" size={44} color="#00719c" />
          </View>
          <Text className="text-2xl mb-4">Inscription</Text>
          <Text className="text-base text-black">
            Entrez votre numéro d'identification nationale
          </Text>
          <Text className="text-sm font-thin">
            Ce numéro figure sur le dos de votre carte d'identité
          </Text>

          <TextInput
            onChangeText={(text) => setNin(text)}
            value={nin}
            placeholder="18456*******"
            style={{
              backgroundColor: "#f3f3f3",
              width: "100%",
              borderRadius: 10,
              padding: 6,
              marginTop: 24,
              height: 55,
              color: "#000",
            }}
            keyboardType="numeric"
          />
          {showMessage && (
            <View className="mt-4">
              <Text className="font-medium" style={{ color: "red" }}>
                Veuillez entrer un numéro d'identification nationale valide{" "}
                {"(" + nin.length + "/" + "13 caractères)"}
              </Text>
            </View>
          )}
          <TouchableOpacity
            className="p-3 bg-secondary w-full rounded-full mt-48"
            onPress={() => {
              if (nin.length !== 13) {
                checkValid = false;
                setShowMessage(true);
                setValid(checkValid ? checkValid : false);
                return;
              }
              router.push({ pathname: "/(auth)/dazLogin" });
            }}
          >
            <Text className="text-center text-2xl text-[#fff]">Vérifier</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
