import { StyleSheet, Text, View, Image, VirtualizedList } from 'react-native'
import React from 'react'

const SignInWith = () => {
  return (
    <View style = {styles.container}>
      <Text style = {{fontWeight : 500}}>Se connecter avec</Text>
      <View style={styles.imageContainer}>
        <View style = {styles.logoContainer}>
          {/* <Image source={{uri : "https://get-picto.com/wp-content/uploads/2023/01/logo-facebook-icon.png"}} style={styles.logo} /> */}
          <Image source={require('../assets/images/facebook.webp')} style={styles.logo} />
        </View>
        <View style = {styles.logoContainer}>
          {/* <Image source={{uri : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FGoogleIndia%2F&psig=AOvVaw1_oL2RjHw36mT3NxVh7ohK&ust=1715859779390000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDvzvnJj4YDFQAAAAAdAAAAABAE"}} style={styles.logo} />
           */}
           {/* je veux mettre l'image qui se trouve dans assets/images, l'image est nomé google.ipng */}
          <Image source={require('../assets/images/google.png')} style={styles.logo} />

        </View>
        <View style = {styles.logoContainer}>
          <Image source={{uri : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AZsgAWMQAY8cAWcTs8voAXcbz9/zh6vcAYcdBf9Cqwef7/f8AW8UAYsdumdgAVcRkk9Z1ndrG1u96oduQsOCuxei2yuozeM5PhtIUbMoncszD1O44e86Bpd3c5vXQ3fGJqt6dueMAUMJYi9SQ2xJeAAAEuElEQVR4nO2d63aiMBRGgYRoKlAoXsFLO9P3f8ZBnTpKQnTN4uQIfvuvUbobyI3knCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAoIjL2WJebNZVpqJeUDqsd5tivliWE265ICjnVZQqnWVCiLA/ml/LtFZpVO1LTr3pPk11n2IWVS3VfsrkFxe5JrX7QedFzCG48OR3dlx494tr5c3viKo9V2MpaR8/EyG9NjnL3LPfkXw5ckGfiiWPYKPo6UaNJZNgGEZ+mpvadyPzD1H7EFz47SZuUR76xZjrITyT09+nhb+RjA1dUAtOeauwqUTqYfietwqbStwTG3I2M2dSWsGSry+8GNJ2++w3aXObzkkNK77e/gdRUQpOIm6/kHjoVqbceiHxg7jkb0qbkduM0HDB39A0TQ3l2HR+37DfdVMb2QehYZG5L65TWb/VUpJWdUY5NN0460fkxeep2Od7TliRYkNouHP94bo6XApOa7pqFGtCQ9f0Xr/dFN3QKVJ2+Y7LGkMNusWOjNDQUS/RZ6vsgWwmqQgNuzv8zHz87zW8/01EaNg9LFVbozDZEI/HMDLf1iZUw3QeQ20pXY3KMLSUpmpNmZ5DS2kaP7bn0JyWkk2XmerQfPO1pZpM8hiKnVHYPUwfnGEo2x1iSbamw2QY6tseMaGbP3EZiupacUL4lpHLMBRqdSm4pdwqxWbYPIvr2fHNULxcky7+Mxo21SillpGiXYziNPQDDGEIQ34GZSj0373hUj3eg3IZytZ+dNn1yWXKIVS++1od4iRJ4sPqa50/OBnhGnnHQXJD/FNYHm4+CVZnESHr2e1QNv4VPuTIZGhMgS8TYNnaAXM2TGtzdS4IZuqBJchBGGZpx17RpLj/rA/BUO26j4qs7ioOwFC+uy4yvdeqPr/h7zsbt+5t0X16w+Xdd7hb94369IYPbBZ5d758fHrDB3AvtY7BMPhyVeIoDJ2VOArD4MMxthmH4cF1qT5UOvBn6NrnORjDyWpfbL7nS/tmSkdbMxDD6XeudCYyrfJvm6PjzdUwDH/l/5qSLF+ZBeLuaw3CcHH7SzbF7sHpEAyN832Wwz7DbmmMb2tzPuW4FJHdkZ4Ml+ZeoihpFxq04Zt5B6bGqs2QDRPLnj5z8/aQDT8tzaR5EmbIhrYzDWZTM2TDGQxPwJAGGF4DQxjCkAYYXgNDGMKQBhheA0MYjs7QOIIOQxpgeA0MYfjKhpSxsBwbXD0aUp7Hd20B8WdoO3PcF64NEt4MSQNgrp/C0Dyu2h+Og69GyIFLwAHZdre+mXn83RNpfBpHqAvx1ubnvyF2rQ9q2/er9tc7r0QaY2juaGpEm85PHvt+54VIg+6NP9aXrY3wDmm8tvHH3HNsxfKHJVBMj4w+9uUjQfeoIQ6z+wQPInWOBH5DypnFEfYwu+SxoMcfz3v8MdlfIK7++HMjvEB+C86hm6ccJcF27HlmXiBX0Avke2LJ2RXZIhQQMvq8a8H4c+cFL5D/MDjmsFSSPIdlypfD8kS5P+Uh1T3nIQ2FyLJTHtI5ax7SM5NzLtldHTZ/UT/JZEW13hQfi1nJdXcCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgP/kDjnplWREBPBIAAAAASUVORK5CYII="}} style={styles.logo} />
        </View>
      </View>
    </View>
  )
}

export default SignInWith

const styles = StyleSheet.create({
    container : {
        marginTop : 10,
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom : 40,
        // backgroundColor : 'red',
    },
    imageContainer: {
        marginTop : 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width : '60%'
      },
      logo: {
        width: '95%',
        height: '95%',
        marginHorizontal: 10,
        backgroundColor : 'white',
        borderRadius : 100,
      },
      logoContainer : {
        // padding : 5,
        backgroundColor : 'white',
        width : 45,
        height : 45,
        borderRadius : 100,
        justifyContent : 'center',
        alignItems : 'center'
      }
})