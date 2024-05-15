import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {Dimensions} from 'react-native';

const Loader = () => {
    return (
        <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={Colors.main100} />
        </View>
     ) 
}

export default Loader

const styles = StyleSheet.create({
    loaderOverlay : {
        // backgroundColor : 'red',
        height : "120%",
        width : Dimensions.get('window').width,
        
        position : "absolute",
        display : "flex",
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : Colors.main30,
        zIndex : 10,
    }, 
})