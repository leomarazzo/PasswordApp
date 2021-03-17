import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
  TouchableHighlight,
  BackHandler,
} from "react-native";
import { LoginsContext } from "../stores/LoginsStore";
import { Input, Header, Button, Icon } from "react-native-elements";
import PasswordInput from "../Common/PasswordInput";
import { LogedInContext } from "../stores/LogedInStorage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";
import Animated from "react-native-reanimated";
import {} from "react-native-gesture-handler";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("Hola");

  const validatIdentificador = () => {
    if (!identificador) {
      seterrorIdentificador(
        "Debe colocar un nombre para guardar la contraseña"
      );
    } else {
      seterrorIdentificador("");
    }
  };

  const salir = () => {
    setLoginForm(false);
  };

  const validarLink = () => {
    if (
      link &&
      !/(?:(?:https?|ftp):\/\/)?\.?(?:[^\s/?\.#-]+\.)+(?:[^\s]*)(?:\/[^\s]*)?/i.test(
        link
      )
    ) {
      seterrorLink("Se debe colocar un link valido");
    } else {
      seterrorLink("");
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
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        salir();
        return true;
      }
    );
    if (currentLogin !== null) {
      setIdentificador(currentLogin.nombre);
      setlink(currentLogin.link !== undefined ? currentLogin.link : "");
      setusername(currentLogin.username);
      setpassword(currentLogin.password);
    }
    return () => backHandler.remove();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#00ba69" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Entendido!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Header
        containerStyle={{ backgroundColor: "#8c8b8b", marginBottom: 30 }}
        leftComponent={
          <Icon
            name="ios-arrow-back"
            type="ionicon"
            color="#fff"
            containerStyle={{marginLeft: 10}}
            onPress={() => salir()}
          />
        }
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
        rightComponent={{
          text: "Guardar",

          disabled:
            !identificador ||
            !!errorIdentificador ||
            !!errorLink ||
            !username ||
            !!errorUsername ||
            !password ||
            !!errorPassword,
          style: { fontSize: 15, color: "#fff", borderLeftColor: "#4fc6e0", borderLeftWidth: 1, height: '100%', paddingTop: '20%', paddingLeft: 10},
          onPress: () => {
            handleGuardar();
          },
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <Input
            label={
              errorIdentificador ? (
                <View>
                  <View style={{ flex: 2, flexDirection: "row" }}>
                    <Text
                      style={[
                        fontsLoaded
                          ? {
                              fontSize: 20,
                              fontFamily: "CarroisGothic_400Regular",
                              fontWeight: "900",
                              color: "#8c8b8b",
                              marginRight: 10,
                            }
                          : { fontSize: 20 },
                      ]}
                    >
                      Nombre de cuenta
                    </Text>
                    <Icon
                      name="help-outline"
                      color="#4fc6e0"
                      onPress={() => {
                        setModalText(
                          "Este es el nombre que verás en la lista de tus cuentas"
                        );
                        setModalVisible(true);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 0,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorIdentificador}
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <Text
                    style={[
                      fontsLoaded
                        ? {
                            fontSize: 20,
                            fontFamily: "CarroisGothic_400Regular",
                            fontWeight: "900",
                            color: "#8c8b8b",
                            marginRight: 10,
                          }
                        : { fontSize: 20 },
                    ]}
                  >
                    Nombre de cuenta
                  </Text>
                  <Icon
                    name="help-outline"
                    color="#4fc6e0"
                    onPress={() => {
                      setModalText(
                        "Este es el nombre que verás en la lista de tus cuentas"
                      );
                      setModalVisible(true);
                    }}
                  />
                </View>
              )
            }
            defaultValue={identificador}
            disabled={currentLogin !== null}
            onEndEditing={() => validatIdentificador()}
            onChangeText={(value) => setIdentificador(value)}
          />

          <Input
            label={
              errorLink ? (
                <View>
                  <View style={{ flex: 3, flexDirection: "row" }}>
                    <Text
                      style={[
                        fontsLoaded
                          ? {
                              fontSize: 20,
                              fontFamily: "CarroisGothic_400Regular",
                              fontWeight: "900",
                              color: "#8c8b8b",
                              marginRight: 10,
                            }
                          : { fontSize: 20 },
                      ]}
                    >
                      Link
                    </Text>
                    <Icon
                      name="help-outline"
                      color="#4fc6e0"
                      onPress={() => {
                        setModalText(
                          "Este es el link de la pagina web o app a la que corresponde tu cuenta"
                        );
                        setModalVisible(true);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 0,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorLink}
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <Text
                    style={[
                      fontsLoaded
                        ? {
                            fontSize: 20,
                            fontFamily: "CarroisGothic_400Regular",
                            fontWeight: "900",
                            color: "#8c8b8b",
                            marginRight: 10,
                          }
                        : { fontSize: 20 },
                    ]}
                  >
                    Link
                  </Text>
                  <Icon
                    name="help-outline"
                    color="#4fc6e0"
                    onPress={() => {
                      setModalText(
                        "Este es el link de la pagina web o app a la que corresponde tu cuenta"
                      );
                      setModalVisible(true);
                    }}
                  />
                </View>
              )
            }
            defaultValue={link}
            onEndEditing={() => validarLink()}
            onChangeText={(value) => {
              setlink(value);
            }}
          />
          <Input
            label={
              errorUsername ? (
                <View>
                  <View style={{ flex: 3, flexDirection: "row" }}>
                    <Text
                      style={[
                        fontsLoaded
                          ? {
                              fontSize: 20,
                              fontFamily: "CarroisGothic_400Regular",
                              fontWeight: "900",
                              color: "#8c8b8b",
                              marginRight: 10,
                            }
                          : { fontSize: 20 },
                      ]}
                    >
                      Nombre de usuario
                    </Text>
                    <Icon
                      name="help-outline"
                      color="#4fc6e0"
                      onPress={() => {
                        setModalText(
                          "Este es el nombre de usuario con el que inicias sesión"
                        );
                        setModalVisible(true);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 0,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorUsername}
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <Text
                    style={[
                      fontsLoaded
                        ? {
                            fontSize: 20,
                            fontFamily: "CarroisGothic_400Regular",
                            fontWeight: "900",
                            color: "#8c8b8b",
                            marginRight: 10,
                          }
                        : { fontSize: 20 },
                    ]}
                  >
                    Nombre de usuario
                  </Text>
                  <Icon
                    name="help-outline"
                    color="#4fc6e0"
                    onPress={() => {
                      setModalText(
                        "Este es el nombre de usuario con el que inicias sesión"
                      );
                      setModalVisible(true);
                    }}
                  />
                </View>
              )
            }
            defaultValue={username}
            onEndEditing={() => validarUsuario()}
            onChangeText={(value) => {
              setusername(value);
              validarUsuario();
            }}
          />

          <PasswordInput
            label={
              errorPassword ? (
                <View>
                  <View style={{ flex: 3, flexDirection: "row" }}>
                    <Text
                      style={[
                        fontsLoaded
                          ? {
                              fontSize: 20,
                              fontFamily: "CarroisGothic_400Regular",
                              fontWeight: "900",
                              color: "#8c8b8b",
                              marginRight: 10,
                            }
                          : { fontSize: 20 },
                      ]}
                    >
                      Password
                    </Text>
                    <Icon
                      name="help-outline"
                      color="#4fc6e0"
                      onPress={() => {
                        setModalText(
                          "Esta es la contraseña que utilizas para iniciar sesion y que quieres guardar"
                        );
                        setModalVisible(true);
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginTop: 0,
                      fontStyle: "italic",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {errorPassword}
                  </Text>
                </View>
              ) : (
                <View style={{ flex: 3, flexDirection: "row" }}>
                  <Text
                    style={[
                      fontsLoaded
                        ? {
                            fontSize: 20,
                            fontFamily: "CarroisGothic_400Regular",
                            fontWeight: "900",
                            color: "#8c8b8b",
                            marginRight: 10,
                          }
                        : { fontSize: 20 },
                    ]}
                  >
                    Password
                  </Text>
                  <Icon
                    name="help-outline"
                    color="#4fc6e0"
                    onPress={() => {
                      setModalText(
                        "Esta es la contraseña que utilizas para iniciar sesion y que quieres guardar"
                      );
                      setModalVisible(true);
                    }}
                  />
                </View>
              )
            }
            defaultValue={password}
            onEndEditing={() => validarContraseña()}
            onChangeText={(value) => setpassword(value)}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateEditLogin;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
