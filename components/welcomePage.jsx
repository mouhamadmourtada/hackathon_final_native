import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";
import { Image } from "expo-image";
import * as Animatable from "react-native-animatable";

export default function WelcomePage(params) {
  return (
    <View className=" px-4  h-screen flex flex-col gap-3 items-center justify-center bg-[#fff]">
      <Animatable.View
        className="text-4xl font-bold text-primary"
        animation={"fadeInLeft"}
      >
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={require("../assets/images/logo.jpg")}
          contentFit="cover"
        />
      </Animatable.View>
      <Text className="text-2xl font-bold text-primary">
        Bienvenue sur Takk Jokk
      </Text>
      <Text className="text-lg w-full text-center  text-accent">
        Deplacez vous en toute confiance avec votre application de covoiturage
        sénégalais !{" "}
      </Text>

      <TouchableOpacity
        className="p-3 bg-secondary w-full rounded-full "
        onPress={() => router.push("/(auth)/ninScreen")}
      >
        <Text className="text-center text-2xl text-[#fff]">Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}
