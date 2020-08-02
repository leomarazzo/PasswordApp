import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { LoginsContext } from "../stores/LoginsStore";
import { Header, Button, Icon, ListItem } from "react-native-elements";
import CreateEditLogin from "./LoginForm";
import ActionButton from "react-native-action-button";
import { openDatabase } from "expo-sqlite";
import { LogedInContext } from "../stores/LogedInStorage";

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

const PasswordList: React.FC<IProps> = ({ navigation }) => {
  const { logins, loginForm, setLoginForm, loadLogins, setCurrentLogin } = useContext(
    LoginsContext
  );
  const {UnlockPassword} = useContext(LogedInContext);

  useEffect(() => {
    const db = openDatabase("passwords");
    db.transaction((tx) =>
      tx.executeSql("Select * from Contraseñas", [], (_, { rows }) => {
        const resultset = (rows as any)._array;
        loadLogins(resultset);
      })
    );
  }, []);

  if (!loginForm) {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: () => {
              navigation.openDrawer();
            },
          }}
          centerComponent={{
            text: "Mis contraseñas",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
        {logins.map((l) => (
          <ListItem
            key={l.nombre}
            title={l.nombre}
            onPress={(e) => setCurrentLogin(l.nombre, UnlockPassword!)}
          />
        ))}
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => setLoginForm(true)}
        />
      </View>
    );
  } else {
    return <CreateEditLogin navigation={navigation} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default observer(PasswordList);
