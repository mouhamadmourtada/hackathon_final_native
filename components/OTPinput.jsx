import React, { useRef, useState, useEffect } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";

const NUMBER_OF_INPUTS = 4;
const inputWidth = Dimensions.get("screen").width / NUMBER_OF_INPUTS;

const OTPInput = ({ onChanged, inputStyles = [], containerStyle }) => {
  const [values, setValues] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    const firstInput = inputsRef.current[0];
    if (firstInput) firstInput.focus();
  }, []);

  const handleChange = (text, index) => {
    const newValues = [...values];
    newValues[index] = text;

    setValues(newValues);
    onChanged(newValues.join(""));

    if (text.length >= 1 && index !== NUMBER_OF_INPUTS - 1) {
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length: NUMBER_OF_INPUTS }, (_, index) => (
        <View
          key={index}
          style={[
            styles.inputContainer,
            index !== NUMBER_OF_INPUTS - 1 && styles.spaceBetween,
          ]}
        >
          <TextInput
            ref={(el) => (inputsRef.current[index] = el)}
            keyboardType="numeric"
            placeholder=""
            selectionColor="transparent"
            defaultValue=""
            maxLength={1}
            style={[styles.textInput, inputStyles[index]]}
            value={values[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Backspace" && index !== 0) {
                const previousInput = inputsRef.current[index - 1];
                if (previousInput) previousInput.focus();
              }
            }}
          />
          {index === NUMBER_OF_INPUTS - 1 && (
            <View style={styles.bottomBorder} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 55,
    aspectRatio: 1,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    fontSize: 18,
    marginRight: 10,
    borderBottomColor: "#00719c",
    borderBottomWidth: 2,
  },
  spaceBetween: {
    marginRight: 0,
  },
});

export default OTPInput;
