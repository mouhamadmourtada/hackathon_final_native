import { useRouter } from "expo-router";
import { View,Text,TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg"
import { router } from 'expo-router';
export default function WelcomePage(params) {
    return(
        <View className=" px-4  h-screen flex flex-col gap-3 items-center justify-center bg-[url('../assets/background.jpg')]">
            <Text className="text-4xl font-bold text-primary">Logo Takk Jokk</Text>
            <Text className="text-2xl font-bold text-primary">Bienvenue sur Takk Jokk</Text>
            <Text className="text-lg w-full text-center  text-accent">Deplacez vous en toute confiance avec votre application de covoiturage sénégalais !   </Text>
        
      <TouchableOpacity className="p-3 bg-secondary w-full rounded-full " onPress={()=> router.push("/(home)/")}>
            <Text className="text-center text-2xl text-[#fff]">Commencer</Text>
        </TouchableOpacity>
        
        </View>
    )
};
