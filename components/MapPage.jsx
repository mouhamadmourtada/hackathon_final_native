import { View, Text, StyleSheet, Platform,TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from "react";
import * as Animatable from 'react-native-animatable';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


export default function MapPage(params) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [paths, setPaths] = useState([]);
    const [markerPositions, setMarkerPositions] = useState([]);
    const carRef = useRef()
    const destinations = [
        {
            nom: "Grand Dakar",
            duree: 20,
            distance: 1.5 + 'KM'
        },
        {
            nom: "Medina",
            duree: 24,
            distance: 1.2 + 'KM'
        },
        {
            nom: "Fass",
            duree: 30,
            distance: 2.3 + 'KM'
        },
    ]
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Generate paths and initial marker positions
            const generatedMarkers = generateMarkers(location.coords);
            setMarkers(generatedMarkers);

            // Set paths for markers
            const pathData = generatePaths(location.coords);
            setPaths(pathData);
            setMarkerPositions(pathData.map(path => path[0]));
        })();
    }, []);

    // Generate initial markers around the user's location
    const generateMarkers = (coords) => {
        const { latitude, longitude } = coords;
        const delta = 0.002;
        return [
            { latitude: latitude + delta, longitude: longitude + delta },
            { latitude: latitude - delta, longitude: longitude - delta },
            { latitude: latitude + delta, longitude: longitude - delta },
            { latitude: latitude - delta, longitude: longitude + delta }
        ];
    };

    const generatePaths = (coords) => {
        const { latitude, longitude } = coords;
        const delta = 0.0005; // Base distance between points
        const subDelta = delta / 28; // Subdivision for smoother paths

        return [
            // Horizontal line (left to right)
            [
                { latitude, longitude: longitude - delta },
                { latitude, longitude: longitude - delta + subDelta },
                { latitude, longitude: longitude - delta + 2 * subDelta },
                { latitude, longitude: longitude - delta + 3 * subDelta },
                { latitude, longitude: longitude - delta + 4 * subDelta },
                { latitude, longitude: longitude - delta + 5 * subDelta },
                { latitude, longitude: longitude - delta + 6 * subDelta },
                { latitude, longitude: longitude - delta + 7 * subDelta },
                { latitude, longitude: longitude - delta + 8 * subDelta },
                { latitude, longitude: longitude - delta + 9 * subDelta },
                { latitude, longitude: longitude + delta }
            ],
            // Vertical line (top to bottom)
            [
                { latitude: latitude - delta, longitude },
                { latitude: latitude - delta + subDelta, longitude },
                { latitude: latitude - delta + 2 * subDelta, longitude },
                { latitude: latitude - delta + 3 * subDelta, longitude },
                { latitude: latitude - delta + 4 * subDelta, longitude },
                { latitude: latitude - delta + 5 * subDelta, longitude },
                { latitude: latitude - delta + 6 * subDelta, longitude },
                { latitude: latitude - delta + 7 * subDelta, longitude },
                { latitude: latitude - delta + 8 * subDelta, longitude },
                { latitude: latitude - delta + 9 * subDelta, longitude },
                { latitude: latitude + delta, longitude }
            ],
            // Diagonal line (top-left to bottom-right)
            [
                { latitude: latitude - delta, longitude: longitude - delta },
                { latitude: latitude - delta + subDelta, longitude: longitude - delta + subDelta },
                { latitude: latitude - delta + 2 * subDelta, longitude: longitude - delta + 2 * subDelta },
                { latitude: latitude - delta + 3 * subDelta, longitude: longitude - delta + 3 * subDelta },
                { latitude: latitude - delta + 4 * subDelta, longitude: longitude - delta + 4 * subDelta },
                { latitude: latitude - delta + 5 * subDelta, longitude: longitude - delta + 5 * subDelta },
                { latitude: latitude - delta + 6 * subDelta, longitude: longitude - delta + 6 * subDelta },
                { latitude: latitude - delta + 7 * subDelta, longitude: longitude - delta + 7 * subDelta },
                { latitude: latitude - delta + 8 * subDelta, longitude: longitude - delta + 8 * subDelta },
                { latitude: latitude - delta + 9 * subDelta, longitude: longitude - delta + 9 * subDelta },
                { latitude: latitude + delta, longitude: longitude + delta }
            ],
            // Diagonal line (top-right to bottom-left)
            [
                { latitude: latitude - delta, longitude: longitude + delta },
                { latitude: latitude - delta + subDelta, longitude: longitude + delta - subDelta },
                { latitude: latitude - delta + 2 * subDelta, longitude: longitude + delta - 2 * subDelta },
                { latitude: latitude - delta + 3 * subDelta, longitude: longitude + delta - 3 * subDelta },
                { latitude: latitude - delta + 4 * subDelta, longitude: longitude + delta - 4 * subDelta },
                { latitude: latitude - delta + 5 * subDelta, longitude: longitude + delta - 5 * subDelta },
                { latitude: latitude - delta + 6 * subDelta, longitude: longitude + delta - 6 * subDelta },
                { latitude: latitude - delta + 7 * subDelta, longitude: longitude + delta - 7 * subDelta },
                { latitude: latitude - delta + 8 * subDelta, longitude: longitude + delta - 8 * subDelta },
                { latitude: latitude - delta + 9 * subDelta, longitude: longitude + delta - 9 * subDelta },
                { latitude: latitude + delta, longitude: longitude - delta }
            ]
        ];
    };
console.log(location)
    // Move markers along the paths
    useEffect(() => {
        const interval = setInterval(() => {
            setMarkerPositions((prevPositions) => {
                return prevPositions?.map((position, index) => {
                    const path = paths[index];
                    const nextIndex = (path.findIndex(p => p.latitude === position.latitude && p.longitude === position.longitude) + 1) % path.length;

                    return path[nextIndex];
                });
            });
            carRef?.current?.fadeIn()
        }, 2000);

        return () => clearInterval(interval);
    }, [paths]);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location?.coords?.latitude || 14.6292532,
                    longitude: location?.coords?.longitude || -17.5542992,

                }}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
                loadingEnabled={true}
                // showsUserLocation={true}
                camera={{
                    center: {
                        latitude: location?.["coords"]?.latitude || 14.6292532,
                        longitude: location?.["coords"]?.longitude || -17.5542992,
                    },
                    pitch: 0,
                    heading: 80,

                    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
                    altitude: 800,

                    // Only when using Google Maps.
                    zoom: 16
                }}
            >
                {
                    
                    <Animatable.Text animation={"bounce"} iterationCount={"infinite"} className={`${!!location ? "hidden" : "absolute"}  top-1/2 left-20 text-[#fff] font-bold z-10 text-3xl`}>Quelques instants ...</Animatable.Text>
                }
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location?.coords?.latitude || 14.6292532,
                            longitude: location?.coords?.longitude || -17.5542992,
                        }}
                    >
                        <Animatable.View className={"flex items-center"} animation={"bounce"} iterationCount={"infinite"} iterationDelay={1000}>
                            <FontAwesome5 name="map-marker-alt" size={42} color="red" />
                            <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff' }}>Ma position</Text>
                        </Animatable.View>
                    </Marker>
                )}

                {paths?.map((path, index) => (
                    <Polyline
                        key={index}
                        coordinates={path}
                        strokeColor="transparent"
                        strokeWidth={3}

                    />
                ))}

                {markerPositions.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker}
                    >
                        <Animatable.View ref={carRef} animation={"fadeIn"} duration={800}>
                            <Ionicons name="car-sport-sharp" size={32} color="yellow" />
                        </Animatable.View>
                    </Marker>
                ))}

            </MapView>
                    {/* White card for destinations */}
           { location &&     <Animatable.View animation={"slideInUp"} className="absolute w-full bottom-0  justify-end  flex flex-col ">
                    <View className="flex flex-wrap  bg-[#fff]  py-6 px-4  rounded-3xl  ">
                    <TouchableOpacity className="flex flex-row py-4 px-4 border-l border-secondary bg-[#F0F0F0] rounded-xl  justify-between ">
                        <View className="flex flex-row items-center gap-2">
                            <FontAwesome5 name="car-side" size={24} color="gray" />
                            <Text className="text-xs text-[#222]"> Ou allons nous ?</Text>
                        </View>
                        <Feather name="arrow-right" size={24} color="black" />
                    </TouchableOpacity>
                    <ScrollView style={{}}>

                        {destinations?.map((destination,index) => {
                            return (
                                <View className=" flex w-full flex-col border-b border-b-[#F0F0F0]  py-2 text-xl text-primary" key={index}>
                                    <View className="flex flex-row  w-full justify-between items-center">
                                        <Text className=" flex flex-col text-xl text-start text-primary">   {destination?.nom}</Text>
                                        <Animatable.View animation={"zoomIn"} iterationDelay={1500} iterationCount={"infinite"} className="w-2 h-2 rounded-full  bg-[#19C53F] "></Animatable.View>
                                    </View>

                                    <Text className=" flex flex-col text-xs text-[#222]">   {destination?.duree} min</Text>
                                    <View className="flex flex-row items-center px-2 justify-between">
                                        <FontAwesome5 name="car-side" size={24} color="#00415a" />
                                        <Text className="text-xs text-[#222]"> A  {destination?.distance}</Text>
                                    </View>
                                </View>
                            )
                        })}
                        </ScrollView>
                    </View>
                </Animatable.View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:"relative"
    },
    map: {
        width: '100%',
        height: '100%',
        position:"relative"

    },
});
