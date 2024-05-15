import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Colors from '../constants/Colors';

const Select = ({ donnees, onChange, defaultButtonText }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemChange = (itemId) => {
    setSelectedItemId(itemId);
    const selectedItem = donnees.find((item) => item.id === itemId);
    onChange(selectedItem.id);
  };

  return (
    <View>
      <SelectDropdown 
        buttonStyle = {styles.buttonStyle}
        buttonTextStyle = {styles.buttonTextStyle}
        defaultButtonText = {defaultButtonText}
        data={donnees.map((item) => item.name)}
        onSelect={(selectedItem, index) => handleItemChange(donnees[index].id)}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item, index) => item}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle : {
    width : '100%', 
    borderRadius : 5, 
    backgroundColor : Colors.blanc, 
  },
  buttonTextStyle : {
    color : Colors.main100,
    fontSize : 14,
    fontWeight : 600
  }
});

export default Select;



