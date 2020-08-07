import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { LogedInContext } from "../stores/LogedInStorage";
import { Button } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";
import { setUnlockPassword as setPWD } from "../Utils/UnlockPassword";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";

const SignUp = () => {
  const [fontsLoaded] = useFonts({ CarroisGothic_400Regular });
  const logedInStorage = useContext(LogedInContext);
  const { setUnlockPassword } = logedInStorage;
  const [password, setpassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  const evaluatePassword = () => {
    if (
      password &&
      !/(?=^.{8,}$)(?=.*\d)(?=.*[\.!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i.test(
        password
      )
    ) {
      setErrorPassword(
        "La contraseña maestra debe tener como minimo 8 caracteres, 1 mayuscula, 1 minuscula, 1 digito y un simbolo"
      );
    } else {
      setErrorPassword("");
    }
  };

  const evaluateConfirm = () => {
    if (password != confirm) {
      setErrorConfirm("Las contraseñas deben coincidir");
    } else {
      setErrorConfirm("");
    }
  };

  const register = async () => {
    evaluatePassword();
    evaluateConfirm();
    if (!!password && !errorPassword && !errorConfirm) {
      await setPWD(password);
      setUnlockPassword(password);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          fontsLoaded
            ? {
                fontSize: 20,
                marginTop: 100,
                marginBottom: 15,
                alignContent: "center",
                textAlign: "center",
                fontFamily: "CarroisGothic_400Regular",
              }
            : {
                fontSize: 20,
                marginTop: 100,
                alignContent: "center",
                textAlign: "center",
              },
        ]}
      >
        Bienvenido a PasswordApp
      </Text>
      <Text
        style={[
          fontsLoaded
            ? {
                fontSize: 20,
                marginBottom: 30,
                alignContent: "center",
                textAlign: "center",
                fontFamily: "CarroisGothic_400Regular",
              }
            : {
                fontSize: 20,
                alignContent: "center",
                textAlign: "center",
              },
        ]}
      >
        Antes de empezar debes establecer tu contraseña maestra
      </Text>
      <PasswordInput
        label={
          errorPassword ? (
            <View>
              <Text>Ingrese la contraseña</Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {errorPassword}
              </Text>
            </View>
          ) : (
            "Ingrese la contraseña"
          )
        }
        onEndEditing={() => evaluatePassword()}
        onChangeText={(value) => {
          setpassword(value);
          evaluatePassword();
        }}
      />

      <PasswordInput
        label={
          errorConfirm ? (
            <View>
              <Text>Confirme la contraseña</Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {errorConfirm}
              </Text>
            </View>
          ) : (
            "Confirme la contraseña"
          )
        }
        onEndEditing={() => evaluateConfirm()}
        onChangeText={(value) => {
          setconfirm(value);
        }}
      />

      <Button
        containerStyle={{
          width: "75%",
          alignSelf: "center",
          marginTop: 30,
          borderRadius: 300,
        }}
        buttonStyle={{ backgroundColor: "#00ba69" }}
        disabled={!password || !!errorPassword || !!errorConfirm}
        title="Inciar"
        type="solid"
        onPress={() => register()}
      />
    </View>
  );
};

export default observer(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignContent: "center",
    justifyContent: "center",
  },
});
