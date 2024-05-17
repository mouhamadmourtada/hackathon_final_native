import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect, useState,useRef } from "react";
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function MapPage(params) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [paths, setPaths] = useState([]);
  const [markerPositions, setMarkerPositions] = useState([]);
  const carRef = useRef()
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
           <Animatable.Text animation={"bounce"} iterationCount={"infinite"} className={`${!!location ? "hidden":"absolute"}  top-1/2 left-20 text-[#fff] font-bold z-10 text-3xl`}>Quelques instants ...</Animatable.Text>
        {location && (
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude || 14.6292532,
              longitude: location?.coords?.longitude || -17.5542992,
            }}
          >
            <Animatable.View animation={"bounce"} iterationCount={"infinite"} iterationDelay={1000}>
              <FontAwesome5 name="map-marker-alt" size={42} color="red" />
              <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#fff' }}>Ma position</Text>
            </Animatable.View>
          </Marker>
        )}

        {paths.map((path, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
