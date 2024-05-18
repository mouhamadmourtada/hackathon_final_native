import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Share,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as Sharing from "expo-sharing";
import { useEffect, useState, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { Feather, FontAwesome5, Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function MapPage(params) {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [paths, setPaths] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [visible, setVisible] = useState(true);
  const [altitude, setAltitude] = useState(1800);
  const [infosChauffeur, setInfosChauffeur] = useState(false);
  const [confort, setConfort] = useState(false);
  const [zoom, setZoom] = useState(16);
  const carRef = useRef();
  const [destination, setDestination] = useState(null);
  const [active, setActive] = useState(1);
  const destinations = [
    {
      nom: "Boulangerie Jaune",
      duree: 20,
      distance: 1.5 + "KM",
      latitude: 14.718952055682307,
      longitude: -17.466519225300594,
    },
    {
      nom: "Medina",
      duree: 24,
      distance: 1.2 + "KM",
      latitude: 14.682746,
      longitude: -17.46785,
    },
    {
      nom: "Fass",
      duree: 30,
      distance: 2.3 + "KM",
      latitude: 14.682746,
      longitude: -17.46785,
    },
  ];
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
      setMarkerPositions(pathData.map((path) => path[0]));
    })();
  }, []);

  const shareLocation = async () => {
    console.log("hahahah");
    // Préparer le message à partager
    const message = `Je suis actuellement ici dans un Takk Jokk : https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    try {
      await Share.share({
        message: message,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  // Generate initial markers around the user's location
  const generateMarkers = (coords) => {
    const { latitude, longitude } = coords;
    const delta = 0.002;
    return [
      { latitude: latitude + delta, longitude: longitude + delta },
      { latitude: latitude - delta, longitude: longitude - delta },
      { latitude: latitude + delta, longitude: longitude - delta },
      { latitude: latitude - delta, longitude: longitude + delta },
    ];
  };

  const handlePressDestination = (destination) => {
    setDestination(destination);
    setZoom(1000);
    setConfort(true);
  };
  const handleConfort = () => {
    setConfort(false);
    setInfosChauffeur(true);
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
        { latitude, longitude: longitude + delta },
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
        { latitude: latitude + delta, longitude },
      ],
      // Diagonal line (top-left to bottom-right)
      [
        { latitude: latitude - delta, longitude: longitude - delta },
        {
          latitude: latitude - delta + subDelta,
          longitude: longitude - delta + subDelta,
        },
        {
          latitude: latitude - delta + 2 * subDelta,
          longitude: longitude - delta + 2 * subDelta,
        },
        {
          latitude: latitude - delta + 3 * subDelta,
          longitude: longitude - delta + 3 * subDelta,
        },
        {
          latitude: latitude - delta + 4 * subDelta,
          longitude: longitude - delta + 4 * subDelta,
        },
        {
          latitude: latitude - delta + 5 * subDelta,
          longitude: longitude - delta + 5 * subDelta,
        },
        {
          latitude: latitude - delta + 6 * subDelta,
          longitude: longitude - delta + 6 * subDelta,
        },
        {
          latitude: latitude - delta + 7 * subDelta,
          longitude: longitude - delta + 7 * subDelta,
        },
        {
          latitude: latitude - delta + 8 * subDelta,
          longitude: longitude - delta + 8 * subDelta,
        },
        {
          latitude: latitude - delta + 9 * subDelta,
          longitude: longitude - delta + 9 * subDelta,
        },
        { latitude: latitude + delta, longitude: longitude + delta },
      ],
      // Diagonal line (top-right to bottom-left)
      [
        { latitude: latitude - delta, longitude: longitude + delta },
        {
          latitude: latitude - delta + subDelta,
          longitude: longitude + delta - subDelta,
        },
        {
          latitude: latitude - delta + 2 * subDelta,
          longitude: longitude + delta - 2 * subDelta,
        },
        {
          latitude: latitude - delta + 3 * subDelta,
          longitude: longitude + delta - 3 * subDelta,
        },
        {
          latitude: latitude - delta + 4 * subDelta,
          longitude: longitude + delta - 4 * subDelta,
        },
        {
          latitude: latitude - delta + 5 * subDelta,
          longitude: longitude + delta - 5 * subDelta,
        },
        {
          latitude: latitude - delta + 6 * subDelta,
          longitude: longitude + delta - 6 * subDelta,
        },
        {
          latitude: latitude - delta + 7 * subDelta,
          longitude: longitude + delta - 7 * subDelta,
        },
        {
          latitude: latitude - delta + 8 * subDelta,
          longitude: longitude + delta - 8 * subDelta,
        },
        {
          latitude: latitude - delta + 9 * subDelta,
          longitude: longitude + delta - 9 * subDelta,
        },
        { latitude: latitude + delta, longitude: longitude - delta },
      ],
    ];
  };
  console.log(location);
  // Move markers along the paths
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerPositions((prevPositions) => {
        return prevPositions?.map((position, index) => {
          const path = paths[index];
          const nextIndex =
            (path.findIndex(
              (p) =>
                p.latitude === position.latitude &&
                p.longitude === position.longitude
            ) +
              1) %
            path.length;

          return path[nextIndex];
        });
      });
      carRef?.current?.fadeIn();
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
        provider={Platform.OS === "ios" ? undefined : PROVIDER_GOOGLE}
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
          altitude: altitude,

          // Only when using Google Maps.
          zoom: zoom,
        }}
      >
        <Animatable.View
          className="text-4xl font-bold text-primary"
          animation={"fadeInLeft"}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/(home)/");
            }}
          >
            <Image
              style={{ width: 60, height: 60, borderRadius: 50 }}
              source={require("../assets/images/logo.jpg")}
              contentFit="cover"
              className="absolute top-14 left-4 z-10"
            />
          </TouchableOpacity>
        </Animatable.View>
        <TouchableOpacity
          onPress={async () => {
            return await shareLocation();
          }}
        >
          <View className="absolute flex flex-col justify-center items-center top-28 right-3 z-10">
            <Entypo name="share" size={36} color="white" />
          </View>
          {/* <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={require("../assets/images/logo.jpg")}
            contentFit="cover"
            className="absolute top-14 right-4 z-10"
          /> */}
        </TouchableOpacity>
        <Animatable.View></Animatable.View>
        {
          <Animatable.Text
            animation={"bounce"}
            iterationCount={"infinite"}
            className={`${
              !!location ? "hidden" : "absolute"
            }  top-1/2 left-20 text-[#fff] font-bold z-10 text-3xl`}
          >
            Quelques instants ...
          </Animatable.Text>
        }
        {location && (
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude || 14.6292532,
              longitude: location?.coords?.longitude || -17.5542992,
            }}
          >
            <Animatable.View
              className={"flex items-center"}
              animation={"bounce"}
              iterationCount={"infinite"}
              iterationDelay={1000}
            >
              <FontAwesome5 name="map-marker-alt" size={42} color="red" />
              <Text style={{ fontWeight: "bold", fontSize: 10, color: "#fff" }}>
                Ma position
              </Text>
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
        {destination && (
          <>
            {/* <Polyline
              coordinates={[destination, location]}
              strokeColor="#006b88" // Couleur de la ligne
              strokeWidth={6} // Largeur de la ligne
            /> */}
            <Marker coordinate={destination}>
              <Animatable.View
                className={"flex items-center"}
                animation={"bounce"}
                iterationCount={"infinite"}
                iterationDelay={1000}
              >
                <Entypo name="flag" size={48} color="red" />
              </Animatable.View>
            </Marker>
          </>
        )}
        {markerPositions.map((marker, index) => (
          <Marker key={index} coordinate={marker}>
            <Animatable.View ref={carRef} animation={"fadeIn"} duration={800}>
              <Ionicons name="car-sport-sharp" size={32} color="yellow" />
            </Animatable.View>
          </Marker>
        ))}
      </MapView>
      {/* White card for destinations */}
      {location && !visible && !destination && (
        <Animatable.View
          animation={"slideInUp"}
          className="absolute w-full bottom-0  justify-end  flex flex-col"
        >
          <View className="flex flex-wrap  bg-[#fff]  py-6 px-4 pb-96 rounded-3xl  ">
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ paddingBottom: 20 }}
              onPress={() => setVisible(true)}
            />
            <View
              className="flex flex-row py-4 px-4 border-l border-secondary bg-[#F0F0F0] rounded-xl  justify-between "
              onPress={() => {
                setVisible(false);
              }}
            >
              <View className="flex flex-row items-center gap-2">
                <Entypo name="flag" size={24} color="black" />
                <TextInput
                  className=" text-[#222] w-[80%] h-full text-lg "
                  placeholder="Entrez la destination"
                >
                  {" "}
                </TextInput>
              </View>
              <Feather name="arrow-right" size={24} color="black" />
            </View>
            <ScrollView style={{}}>
              {destinations?.map((destination, index) => {
                return (
                  <TouchableOpacity
                    className=" flex w-full flex-col border-b border-b-[#F0F0F0]  py-2 text-xl text-primary"
                    key={index}
                    onPress={() => {
                      handlePressDestination(destination);
                    }}
                  >
                    <View className="flex flex-row  w-full justify-between items-center">
                      <Text className=" flex flex-col text-xl text-start text-primary">
                        {" "}
                        {destination?.nom}
                      </Text>
                      <Animatable.View
                        animation={"zoomIn"}
                        iterationDelay={1500}
                        iterationCount={"infinite"}
                        className="w-2 h-2 rounded-full  bg-[#19C53F] "
                      ></Animatable.View>
                    </View>

                    <Text className=" flex flex-col text-xs text-[#222]">
                      {" "}
                      {destination?.duree} min
                    </Text>
                    <View className="flex flex-row items-center px-2 justify-between">
                      <Entypo name="location-pin" size={24} color="black" />
                      <Text className="text-xs text-[#222]">
                        {" "}
                        A {destination?.distance}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Animatable.View>
      )}
      {location && visible && destination?.latitude == null && (
        <Animatable.View
          animation={"slideInUp"}
          className="absolute w-full bottom-0  justify-end  flex flex-col "
        >
          <View className="flex flex-wrap  bg-[#fff]  py-6 px-4  rounded-3xl  ">
            <TouchableOpacity
              className="flex flex-row py-4 px-4 border-l border-secondary bg-[#F0F0F0] rounded-xl  justify-between "
              onPress={() => {
                setVisible(false);
              }}
            >
              <View className="flex flex-row items-center gap-2">
                <FontAwesome5 name="car-side" size={24} color="gray" />
                <Text className="text-xs text-[#222]"> Où allons nous ?</Text>
              </View>
              <Feather name="arrow-right" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{}}>
              {destinations?.map((destination, index) => {
                return (
                  <TouchableOpacity
                    className=" flex w-full flex-col border-b border-b-[#F0F0F0]  py-2 text-xl text-primary"
                    key={index}
                    onPress={() => {
                      handlePressDestination(destination);
                    }}
                  >
                    <View className="flex flex-row  w-full justify-between items-center">
                      <Text className=" flex flex-col text-xl text-start text-primary">
                        {" "}
                        {destination?.nom}
                      </Text>
                      <Animatable.View
                        animation={"zoomIn"}
                        iterationDelay={1500}
                        iterationCount={"infinite"}
                        className="w-2 h-2 rounded-full  bg-[#19C53F] "
                      ></Animatable.View>
                    </View>

                    <Text className=" flex flex-col text-xs text-[#222]">
                      {" "}
                      {destination?.duree} min
                    </Text>
                    <View className="flex flex-row items-center px-2 justify-between">
                      <FontAwesome5 name="car-side" size={24} color="#00415a" />
                      <Text className="text-xs text-[#222]">
                        {" "}
                        A {destination?.distance}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Animatable.View>
      )}
      {infosChauffeur && (
        <Animatable.View
          animation={"slideInUp"}
          className="absolute w-full bottom-0  justify-end  flex flex-col "
        >
          <View className="flex flex-wrap items-center bg-[#fff]  py-6 px-4  rounded-3xl  ">
            <View className="flex flex-col gap-6 w-full justify-center items-center">
              <View className="rounded-full w-20 h-20 ">
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                  source="https://picsum.photos/seed/696/3000/2000"
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <View className="flex flex-row justify-between w-full border-t pt-4">
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Nom du chauffeur
                </Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  Modou Dieng
                </Text>
              </View>
              <View className="flex flex-row justify-between w-full">
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Numéro de téléphone{" "}
                </Text>
                <Text style={{ color: "black", fontSize: 18 }}>
                  77 123 45 67
                </Text>
              </View>
              <View className="flex flex-row justify-between w-full">
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Prix du trajet{" "}
                </Text>
                <Text style={{ color: "black", fontSize: 18 }}>2000 FCFA</Text>
              </View>
              <View className="flex flex-row justify-between w-full">
                <Text
                  style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                >
                  Durée estimée{" "}
                </Text>
                <Text style={{ color: "black", fontSize: 18 }}>20 min</Text>
              </View>
              <View className="flex flex-col gap-1 w-full">
                <TouchableOpacity
                  className="p-2 w-full rounded-full mt-48 bg-primary"
                  onPress={() => {
                    router.push("/(home)/chat");
                  }}
                >
                  <Text className="text-center text-xl text-[#fff]">
                    Contacter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: "red" }}
                  className="p-2 w-full rounded-full mt-48"
                  onPress={() => {
                    setVisible(false);
                    setInfosChauffeur(false);
                    setDestination(null);
                  }}
                >
                  <Text className="text-center text-xl text-[#fff]">
                    Annuler la course
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animatable.View>
      )}
      {confort && (
        <Animatable.View
          animation={"slideInUp"}
          className="absolute w-full bottom-0  justify-end  flex flex-col "
        >
          <View className="flex flex-wrap items-center bg-[#fff]  py-4  rounded-3xl  ">
            <View className="flex flex-col gap-4 w-full">
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                onPress={() => {
                  setConfort(false);
                  setVisible(true);
                  setDestination(null);
                }}
              />
              <Text className="text-2xl font-bold">VOTRE COURSE</Text>
              {/* Car card */}
              <View className="rounded-xl shadow-sm flex flex-row gap-2 items-center border-b pb-3 border-b-[#ebebeb]">
                <FontAwesome5 name="hand-paper" size={24} color="red" />
                <View className="flex flex-col justify-center items-center  ">
                  <Text
                    style={{ color: "gray" }}
                    className="mr-auto text-xs font-bold"
                  >
                    Prise en charge
                  </Text>
                  <Text
                    style={{ color: "black", fontWeight: "bold" }}
                    className=" mr-auto text-md"
                  >
                    Grand Dakar, Rue SC-93, 125
                  </Text>
                </View>
              </View>
              {/* Car card */}
              <View className="rounded-xl shadow-sm flex flex-row gap-2 items-center border-b pb-3 border-b-[#ebebeb]">
                <Ionicons name="flag-outline" size={24} color="black" />
                <View className="flex flex-col justify-center items-center  ">
                  <Text
                    style={{ color: "gray" }}
                    className="mr-auto text-xs font-bold"
                  >
                    = arrivée à 13min
                  </Text>
                  <Text
                    style={{ color: "black", fontWeight: "bold" }}
                    className=" mr-auto text-md"
                  >
                    {destination.nom}
                  </Text>
                </View>
              </View>
              <ScrollView horizontal className="flex flex-row gap-2 ">
                {/* Confort Card */}
                <TouchableOpacity
                  className={`${
                    active == 1 ? "bg-[#5b78bb] " : "bg-[#f0f4f598]"
                  }flex flex-col px-4 py-2 border-r border-r-[#ebebeb]  rounded-xl `}
                  onPress={() => {
                    setActive(1);
                  }}
                >
                  <Fontisto name="car" size={24} color="black" />
                  <Text className="">La plus proche</Text>
                  <Text className="text-lg font-bold">800 FCFA</Text>
                </TouchableOpacity>
                {/* Confort Card */}
                <TouchableOpacity
                  className={`${
                    active == 2 ? "bg-[#5b78bb] " : "bg-[#f0f4f598]"
                  }flex flex-col px-4 py-2 border-r border-r-[#ebebeb]  rounded-xl `}
                  onPress={() => {
                    setActive(2);
                  }}
                >
                  <Fontisto name="car" size={24} color="black" />
                  <Text className="">Confort</Text>
                  <Text className="text-lg font-bold">1100FCFA</Text>
                </TouchableOpacity>
                {/* Confort Card */}
                <TouchableOpacity
                  className={`${
                    active == 3 ? "bg-[#5b78bb] " : "bg-[#f0f4f598]"
                  }flex flex-col px-4 py-2 border-r border-r-[#ebebeb]  rounded-xl `}
                  onPress={() => {
                    setActive(3);
                  }}
                >
                  <Fontisto name="car" size={24} color="black" />
                  <Text className="">Eco</Text>
                  <Text className="text-lg font-bold">1200FCFA</Text>
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity
                className="p-2 w-80 self-center rounded-full bg-primary"
                onPress={handleConfort}
              >
                <Text className="text-center text-xl text-[#fff]">
                  Commander
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
