import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { Controller, Control } from "react-hook-form";

interface CustomTextInputProps extends TextInputProps {
  name: string;
  caption?: string;
  rules?: object;
  control: Control<any>;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  name,
  caption,
  control,
  rules,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          { caption && <Text style={styles.caption}>{caption}</Text> }
          <RNTextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...rest}
            style={styles.input}
          />
        </View>
      )}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  caption: {
    marginBottom: 4,
    fontSize: 14,
    color: "#333",
  },
});

export default TextInput;
