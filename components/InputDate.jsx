import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const InputDate = ({style, onChangeDate}) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
      onChangeDate(formattedDate);
    };

    const togglePicker = () => {
      setShowPicker(!showPicker);
    }
  
    return (
        <View style={style}>
            <Button title="Select Date" onPress={togglePicker} />
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            )}
        </View>
    );
}

export default InputDate;

const styles = StyleSheet.create({
    datePicker: {
        // width: 320,
        // backgroundColor: 'white',
        // color: 'black',
    },
});
