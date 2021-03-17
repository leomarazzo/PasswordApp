import * as React from "react";
import {
  StyleSheet,
  Image,
  Clipboard,
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Header, Icon } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import { generatePassword } from "../Utils/PasswordGenerator";
import {Checkbox} from "react-native-paper"
import { LoginsContext } from "../stores/LoginsStore";

type ParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
  Info: undefined;
};

type ProfileScreenNavigationProp = DrawerNavigationProp<ParamList>;

interface IProps {
  navigation: ProfileScreenNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    margin: 10,
  },
  checkbox: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    marginHorizontal: 10,
  },
  password: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    width: "100%",
  },
});

const PasswordGenerate: React.FC<IProps> = ({ navigation }) => {
  const [mayus, setMayus] = useState(true);
  const [nums, setNums] = useState(true);
  const [minus, setMinus] = useState(true);
  const [simbolos, setSimbolos] = useState(true);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
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


  const genPassword = () => {
    if (!minus && !mayus && !nums && !simbolos) {
      alert("Al menos debe seleccionar una opcion");
    } else {
      const pass = generatePassword(length, mayus, minus, nums, simbolos);
      setPassword(pass);
    }
  };

  const writeToClipboard = async (password: string) => {
    if (password.length > 0) {
      Clipboard.setString(password);
      Alert.alert("Copiado","Copiado al portapapeles");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{ marginBottom: 30, backgroundColor: "#8c8b8b" }}
        leftComponent={ <Icon
          name="menu"
          color="#fff"
          containerStyle={{marginLeft: 10}}
          onPress={() => navigation.openDrawer()}
        />}
        centerComponent={<Text style={{color: "#fff", fontSize: 25, textAlign:"center"}}>Generador de contraseña</Text>}
      />
      <View style={styles.checkbox}>
        <Checkbox status={mayus ? 'checked' : 'unchecked'} onPress={() => setMayus(!mayus)} />
        <Text style={{ fontSize: 20 }}>¿Incluir mayusculas?</Text>
      </View>
      <View style={styles.checkbox}>
        <Checkbox status={minus ? 'checked' : 'unchecked'} onPress={() => setMinus(!minus)} />
        <Text style={{ fontSize: 20 }}>¿Incluir minusculas?</Text>
      </View>
      <View style={styles.checkbox}>
        <Checkbox status={nums ? 'checked': 'unchecked'} onPress={() => setNums(!nums)} />
        <Text style={{ fontSize: 20 }}>¿Incluir números?</Text>
      </View>
      <View style={styles.checkbox}>
        <Checkbox status={simbolos ? 'checked': 'unchecked'} onPress={() => setSimbolos(!simbolos)} />
        <Text style={{ fontSize: 20 }}>¿Incluir simbolos?</Text>
      </View>
      <View style={styles.checkbox}>
        <Text style={{ fontSize: 20, marginRight: 20 }}>Largo</Text>
        <InputSpinner
          max={30}
          min={4}
          value={length}
          onChange={(largo) => {
            setLength(largo);
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          genPassword();
        }}
      >
        <Text>Generate password</Text>
      </TouchableOpacity>

      <View style={styles.password}>
        <Text
          style={{
            fontSize: password.length > 18 ? 15 : 30,
            alignItems: "flex-start",
          }}
        >
          {password}
        </Text>
        <TouchableOpacity
          onPress={() => {
            writeToClipboard(password);
          }}
        >
          <Image
            source={{
              uri: "https://image.flaticon.com/icons/png/512/65/65608.png",
            }}
            style={{ width: 30, height: 30, margin: 5, alignItems: "flex-end" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordGenerate;
