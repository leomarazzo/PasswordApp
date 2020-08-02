import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LoginsContext } from "../stores/LoginsStore";
import { Input, Header, Button } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";
import { LogedInContext } from "../stores/LogedInStorage";
import { DrawerNavigationProp } from "@react-navigation/drawer";

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
        containerStyle={{ marginBottom: 20 }}
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            navigation.openDrawer();
          },
        }}
        centerComponent={{
          text:
            currentLogin !== null ? "Editar contraseña" : "Nueva constraseña",
          style: { color: "#fff", fontSize: 20 },
        }}
      />
      <Input
        label="Identificador"
        defaultValue={identificador}
        disabled={currentLogin !== null}
        onEndEditing={() => validatIdentificador()}
        onChangeText={(value) => setIdentificador(value)}
      />
      {!!errorIdentificador && (
        <Text style={{ fontStyle: "italic", fontWeight: "bold", color: "red" }}>
          {errorIdentificador}
        </Text>
      )}
      <Input
        label="Vinculo asociado"
        defaultValue={link}
        onEndEditing={() => validarLink()}
        onChangeText={(value) => {setlink(value)}}
      />
      {!!errorLink && (
        <Text style={{ fontStyle: "italic", fontWeight: "bold", color: "red" }}>
          {errorLink}
        </Text>
      )}
      <Input
        label="Nombre de usuario"
        defaultValue={username}
        onEndEditing={() => validarUsuario()}
        onChangeText={(value) => {setusername(value); validarUsuario()}}
      />
      {!!errorUsername && (
        <Text style={{ fontStyle: "italic", fontWeight: "bold", color: "red" }}>
          {errorUsername}
        </Text>
      )}
      <PasswordInput
        label="Contraseña"
        defaultValue={password}
        onEndEditing={() => validarContraseña()}
        onChangeText={(value) => setpassword(value)}
      />
      {!!errorPassword && (
        <Text style={{ fontStyle: "italic", fontWeight: "bold", color: "red" }}>
          {errorPassword}
        </Text>
      )}

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
