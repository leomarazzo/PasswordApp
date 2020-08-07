import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { LogedInContext } from "../stores/LogedInStorage";
import { checkUnlockPassword } from "../Utils/UnlockPassword";
import { Button } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";
import { AdMobInterstitial } from "expo-ads-admob";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";

const SignIn = () => {
  const [fontsLoaded] = useFonts({ CarroisGothic_400Regular });
  const logedInStorage = useContext(LogedInContext);
  const { setUnlockPassword } = logedInStorage;
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const showAdd = async () => {
      const unitID =
        Platform.OS == "ios"
          ? "ca-app-pub-1461193511253828/4245605492"
          : "ca-app-pub-1461193511253828/2164854173";
      AdMobInterstitial.setAdUnitID(unitID);
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
      await AdMobInterstitial.showAdAsync();
    };

    showAdd();
  }, []);

  const passwordChange = (value: string) => {
    setPassword(value);
  };

  const checkPassword = () => {
    if (password.length > 0) {
      checkUnlockPassword(password).then((res) => {
        if (res) {
          setUnlockPassword(password);
        } else {
          setPasswordError("Contraseña incorrecta");
        }
      });
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
      <PasswordInput
        label={
          passwordError ? (
            <View>
              <Text>Ingrese la contraseña</Text>
              <Text
                style={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {passwordError}
              </Text>
            </View>
          ) : (
            "Ingrese la contraseña"
          )
        }
        onChangeText={(value) => passwordChange(value)}
      />

      <Button
        containerStyle={{
          width: "75%",
          alignSelf: "center",
          marginTop: 30,
          borderRadius: 300,
        }}
        buttonStyle={{ backgroundColor: "#00ba69" }}
        disabled={!(password.length >= 8)}
        title="Ingresar"
        type="solid"
        onPress={() => checkPassword()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignContent: "center",
    justifyContent: "space-evenly",
  },
});

export default observer(SignIn);
