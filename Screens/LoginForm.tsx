import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LoginsContext } from "../stores/LoginsStore";
import { Input, Header, Button } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";
import { LogedInContext } from "../stores/LogedInStorage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";

type ParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
};

type PasswordStackScreenNavigationProp = DrawerNavigationProp<
  ParamList,
  "Passwords"
>;

interface IProps {
  navigation: PasswordStackScreenNavigationProp;
}

const CreateEditLogin: React.FC<IProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({ CarroisGothic_400Regular });
  const {
    currentLogin,
    createLogin,
    setLoginForm,
    actualizarLogin,
    borrarLogin,
  } = useContext(LoginsContext);
  const { UnlockPassword } = useContext(LogedInContext);
  const [identificador, setIdentificador] = useState("");
  const [errorIdentificador, seterrorIdentificador] = useState("");
  const [link, setlink] = useState("");
  const [errorLink, seterrorLink] = useState("");
  const [username, setusername] = useState("");
  const [errorUsername, seterrorUsername] = useState("");
  const [password, setpassword] = useState("");
  const [errorPassword, seterrorPassword] = useState("");

  const validatIdentificador = () => {
    
    if (!identificador) {
      seterrorIdentificador(
        "Debe colocar un nombre para guardar la contraseña"
      );
    } else {
      seterrorIdentificador("");
    }
  };

  const validarLink = () => {
    if (
      link &&
      !/(?:(?:https?|ftp):\/\/)?\.?(?:[^\s/?\.#-]+\.)+(?:[^\s]*)(?:\/[^\s]*)?/i.test(
        link
      )
    ) {
      seterrorLink("Se debe colocar un link valido");
    }else{
      seterrorLink("")
    }
  };

  const validarUsuario = () => {
    if (!username) {
      seterrorUsername("Debe colocar un nombre de usuario");
    } else {
      seterrorUsername("");
    }
  };

  const validarContraseña = () => {
    if (!password) {
      seterrorPassword("Debe colocar una contraseña");
    } else {
      seterrorPassword("");
    }
  };

  useEffect(() => {
    if (currentLogin !== null) {
      setIdentificador(currentLogin.nombre);
      setlink(currentLogin.link !== undefined ? currentLogin.link : "");
      setusername(currentLogin.username);
      setpassword(currentLogin.password);
    }
  }, []);

  const handleGuardar = () => {
    if (currentLogin === null) {
      createLogin(
        {
          nombre: identificador,
          link: link,
          username: username,
          password: password,
        },
        UnlockPassword!
      );
    } else {
      actualizarLogin(
        {
          nombre: identificador,
          link: link,
          username: username,
          password: password,
        },
        UnlockPassword!
      );
    }
  };

  const handleBorrar = () => {
    borrarLogin(identificador);
  };

  return (
    <View>
      <Header
        containerStyle={{ marginBottom: 30, backgroundColor: "#8c8b8b" }}
        
        centerComponent={{
          text:
            currentLogin !== null ? "Editar contraseña" : "Nueva constraseña",
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
      <Input
        style={{marginBottom:3, marginTop:30}}
        label={errorIdentificador ? (
          <View>
          <Text>
            Nombre de cuenta
          </Text>
          <Text style={{marginTop:0, fontStyle: "italic", fontWeight: "bold", color: "red" }}>
            {errorIdentificador}
          </Text>
          </View>
        ) : "Nombre de cuenta"}
        defaultValue={identificador}
        disabled={currentLogin !== null}
        onEndEditing={() => validatIdentificador()}
        onChangeText={(value) => setIdentificador(value)}
      />
      <Input
        style={{marginBottom:3, marginTop:30}}
        label={errorLink ? (
          <View>
          <Text>
            Link de cuenta asociada
          </Text>
          <Text style={{marginTop:0, fontStyle: "italic", fontWeight: "bold", color: "red" }}>
            {errorLink}
          </Text>
          </View>
        ) : "Link de cuenta asociada"}
        defaultValue={link}
        onEndEditing={() => validarLink()}
        onChangeText={(value) => {setlink(value)}}
      />
      <Input
      style={{marginBottom:3, marginTop:30}}
        label={errorUsername ? (
          <View>
          <Text>
          Nombre de usuario
          </Text>
          <Text style={{marginTop:0, fontStyle: "italic", fontWeight: "bold", color: "red" }}>
            {errorUsername}
          </Text>
          </View>
        ) : "Nombre de usuario"}
        defaultValue={username}
        onEndEditing={() => validarUsuario()}
        onChangeText={(value) => {setusername(value); validarUsuario()}}
      />
      
      <PasswordInput
      style={{marginBottom:3, marginTop:30}}
        label={errorPassword ? (
          <View>
          <Text>
          Contraseña
          </Text>
          <Text style={{marginTop:0, fontStyle: "italic", fontWeight: "bold", color: "red" }}>
            {errorPassword}
          </Text>
          </View>
        ) : "Contraseña"}
        defaultValue={password}
        onEndEditing={() => validarContraseña()}
        onChangeText={(value) => setpassword(value)}
      />

      <Button
        buttonStyle={{ marginVertical: 15, marginHorizontal: 20 }}
        disabled={
          !identificador ||
          !!errorIdentificador ||
          !!errorLink ||
          !username ||
          !!errorUsername ||
          !password ||
          !!errorPassword
        }
        title="Guardar"
        onPress={() => handleGuardar()}
      />
      <Button
        buttonStyle={{ marginVertical: 15, marginHorizontal: 20 }}
        title="Salir"
        type="outline"
        onPress={() => setLoginForm(false)}
      />

      {currentLogin !== null && (
        <Button
          buttonStyle={{
            marginVertical: 10,
            marginHorizontal: 20,
            borderColor: "red",
          }}
          titleStyle={{ color: "red" }}
          type="outline"
          title="Borrar"
          onPress={() => handleBorrar()}
        />
      )}
    </View>
  );
};

export default CreateEditLogin;

const styles = StyleSheet.create({});
