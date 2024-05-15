// import React, { useState } from 'react';
// import { View, Text, Switch, StyleSheet } from 'react-native';
// import Colors from '../constants/Colors';

// const SwitchComponent = ({onSwitch, defaultText}) => {
//   const [isTrue, setisTrue] = useState(false);

//   const handleSwitchChange = (value) => {
//     setisTrue(value);
//     onSwitch(value)
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{defaultText}</Text>
//       <Switch 
//         trackColor={{false: '#767577', true: Colors.main100}}
//         value={isTrue}
//         onValueChange={handleSwitchChange}
//       />
//       <Text>{isTrue ? 'Oui' : 'Non'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
// });

// export default SwitchComponent;


import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const SwitchComponent = ({ onSwitch, defaultText }) => {
  const [isTrue, setIsTrue] = useState(false);

  const handleSwitchChange = (value) => {
    setIsTrue(value);
    onSwitch(value ? 1 : 0); // Envoie 1 si true, 0 si false
  };

  return (
    <View style={styles.container}>
      <Text>{defaultText}</Text>
      <Switch 
        trackColor={{false: '#767577', true: Colors.main100}}
        value={isTrue}
        onValueChange={handleSwitchChange}
      />
      <Text>{isTrue ? 'Oui' : 'Non'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SwitchComponent;
