import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function chat() {
  const [mess, setMess] = useState("");
  const initial = [
    { id: 1, message: "Salam, seugn bi fo nek?", sender: "driver" },
  ];
  const [messages, setMessages] = useState(initial);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const sendMessage = () => {
    if (mess.length > 0) {
      setMessages([
        ...messages,
        { id: messages.length + 1, message: mess, sender: "client" },
      ]);
      setMess("");
      console.log(messages);
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          height: "100%",
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight,
        }}
      >
        <View className="h-14 bg-primary flex flex-row items-center justify-between px-4">
          <View className="flex flex-row gap-2 w-fit justify-center items-center">
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
            <View className="rounded-full w-10 h-10">
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                source="https://picsum.photos/seed/696/3000/2000"
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text style={{ color: "white", fontSize: 18 }}>Modou Dieng</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </View>
        </View>
        <ScrollView
          style={{
            backgroundColor: "white",
            height: Dimensions.get("window").height,
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text className="w-fit text-center underline italic">
            Aujourd'hui
          </Text>
          {messages.map((item) => {
            return (
              <Animatable.View
                animation={"lightSpeedIn"}
                key={item.id}
                className={`flex mt-5 flex-row justify-${
                  item.sender === "client" ? "end" : "start"
                }`}
              >
                <View
                  className={`rounded-xl bg-${
                    item.sender === "client"
                      ? "secondary rounded-br-none"
                      : "primary rounded-tl-none"
                  } p-2 `}
                >
                  <Text style={{ color: "white" }}>{item.message}</Text>
                </View>
              </Animatable.View>
            );
          })}
        </ScrollView>
        <View className="flex flex-row gap-2 px-2 mb-2 self-end bg-[#fff]">
          <TextInput
            className="flex-1 p-2 rounded-full bg-[#fff] border border-[#f3f3f3]"
            placeholder="Ecrire votre message ici"
            value={mess}
            onChangeText={(text) => setMess(text)}
          />
          <TouchableOpacity
            className="bg-primary p-4 rounded-full flex justify-center items-center"
            onPress={sendMessage}
          >
            <Entypo name="paper-plane" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className=" p-4 rounded-full flex justify-center items-center">
            <FontAwesome name="microphone" size={24} color="#00719c" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
