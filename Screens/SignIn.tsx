import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { LogedInContext } from "../stores/LogedInStorage";
import { checkUnlockPassword } from "../Utils/UnlockPassword";
import { Button } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";

const SignIn = () => {
  const logedInStorage = useContext(LogedInContext);
  const { setUnlockPassword } = logedInStorage;
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkPassword = () => {
    if (password.length > 0) {
      if (checkUnlockPassword(password)) {
        setUnlockPassword(password);
      } else {
        setPasswordError("Contraseña incorrecta")
      }
    }
  };

  return (
    <View style={styles.container}>
      <PasswordInput label="Ingrese la contraseña" onChangeText={(value) => setPassword(value)}/>
      <Button style={{borderRadius:200}} disabled={!(password.length >= 8)} title="Ingresar" type="outline" onPress={() => checkPassword()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    margin: 10,
  },
});

export default observer(SignIn);
