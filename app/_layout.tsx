import { Stack } from "expo-router";

export default function HomeLayout(){
    return <>
        {/* <Header/> */}
   {/* <Stack.Screen options={{headerShown:false}}/> */}

        <Stack screenOptions={{animation:"default",headerShown:false}} />
    </> 
}
