import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

interface IProps {
  onpress: () => void;
}

const ActionButton: React.FC<IProps> = ({ onpress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onpress}
      style={styles.TouchableOpacityStyle}
    >
      <Icon reverse raised name="add" size={30} color="#f50" backgroundColor="#E74C3C" />
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    
    backgroundColor: "#E74C3C",
  },
});
