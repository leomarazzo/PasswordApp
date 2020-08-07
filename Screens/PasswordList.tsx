import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  StyleSheet,
  View
} from "react-native";
import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { LoginsContext } from "../stores/LoginsStore";
import { Header, ListItem } from "react-native-elements";
import CreateEditLogin from "./LoginForm";

import { openDatabase } from "expo-sqlite";
import { LogedInContext } from "../stores/LogedInStorage";
import {
  useFonts,
  CarroisGothic_400Regular,
} from "@expo-google-fonts/carrois-gothic";
import ActionButton from "../Common/ActionButton";

type ParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
  Info: undefined;
};

type PasswordStackScreenNavigationProp = DrawerNavigationProp<
  ParamList,
  "Passwords"
>;

interface IProps {
  navigation: PasswordStackScreenNavigationProp;
}

const PasswordList: React.FC<IProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({ CarroisGothic_400Regular });

  const {
    sortedLogins,
    loginForm,
    setLoginForm,
    loadLogins,
    setCurrentLogin,
  } = useContext(LoginsContext);
  const { UnlockPassword } = useContext(LogedInContext);

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
          containerStyle={{ backgroundColor: "#8c8b8b" }}
          leftComponent={{
            icon: "menu",
            color: "#fff",
            style: {marginLeft: '10%', width: '10%'},
            onPress: () => {
              navigation.openDrawer();
            },
          }}
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
        
        {sortedLogins.map((l, i) => (
          <ListItem
            key={l.nombre}
            title={l.nombre}
            containerStyle={[
              i % 2 == 0
                ? { backgroundColor: "#ebe8e8" }
                : { backgroundColor: "#969696" },
            ]}
            onPress={() => setCurrentLogin(l.nombre, UnlockPassword!)}
          />
        ))}
        <ActionButton onpress={() => setLoginForm(true)}/>
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
