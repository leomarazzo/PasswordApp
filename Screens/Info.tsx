import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  BackHandler,
} from "react-native";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";
import { Header, Icon } from "react-native-elements";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { LoginsContext } from "../stores/LoginsStore";

type ParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
  Info: undefined;
};

type PasswordStackScreenNavigationProp = DrawerNavigationProp<
  ParamList,
  "Info"
>;

interface IProps {
  navigation: PasswordStackScreenNavigationProp;
}

const Info: React.FC<IProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({ CarroisGothic_400Regular });
  const {setLoginForm} = useContext(LoginsContext);

  const salir = () => {
    setLoginForm(false);
    navigation.jumpTo("Passwords");
  }


  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      salir();
      return true;
    })

    return () => backHandler.remove();
  }, []);

  const handleClick = () => {
    Linking.canOpenURL("https://github.com/leomarazzo/PasswordApp").then(
      (supported) => {
        if (supported) {
          Linking.openURL("https://github.com/leomarazzo/PasswordApp");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{ backgroundColor: "#8c8b8b" }}
        leftComponent={ <Icon
          name="menu"
          color="#fff"
          containerStyle={{marginLeft: 10}}
          onPress={() => navigation.openDrawer()}
        />}
        centerComponent={{
          text: "Mis contraseñas",
          style: [
            fontsLoaded
              ? {
                  fontSize: 20,
                  fontFamily: "CarroisGothic_400Regular",
                }
              : { fontSize: 20 },
          ],
        }}
      />
      <View style={{ flex: 3, alignItems: "center" }}>
        <Text style={[fontsLoaded ? styles.HeaderFontsLoaded : styles.Header]}>
          PasswordApp
        </Text>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 100, height: 100, marginBottom: 30 }}
        />
        <Text style={[fontsLoaded ? styles.TextFontLoaded : styles.Text]}>
          Esta app es un proyecto de software libre.
        </Text>
        <Text style={[fontsLoaded ? styles.TextFontLoaded : styles.Text]}>
          Sugerencias o cambios son bienvenidas
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "CarroisGothic_400Regular",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop:20
          }}
        >
          El codigo fuente de la App se encuentra
        </Text>
        <Text style={{
            fontSize: 17,
            fontFamily: "CarroisGothic_400Regular",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}>
          disponible en el siguiente enlace:
        </Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Text style={styles.Link}>
            https://github.com/leomarazzo/PasswordApp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    alignContent: "center",
  },
  HeaderFontsLoaded: {
    fontSize: 40,
    marginTop: 30,
    fontFamily: "CarroisGothic_400Regular",
  },
  Header: {
    fontSize: 40,
  },
  TextFontLoaded: {
    fontSize: 17,
    fontFamily: "CarroisGothic_400Regular",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  Text2FontLoaded: {
    fontSize: 17,
    fontFamily: "CarroisGothic_400Regular",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  Text: {
    fontSize: 20,
  },
  Link: {
    margin: 20,
    fontSize: 15,
    color: "blue",
  },
});

export default Info;
