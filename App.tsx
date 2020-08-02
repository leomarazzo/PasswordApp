import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import PasswordGenerate from "./Screens/PasswordGenerate";
import { NavigationContainer } from "@react-navigation/native";
import PasswordList from "./Screens/PasswordList";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SignIn from "./Screens/SignIn";
import SingUp from "./Screens/SignUp";
import { observer } from "mobx-react-lite";
import { LogedInContext } from "./stores/LogedInStorage";
import { isSet } from "./Utils/UnlockPassword";
import { startDatabaseIfNot } from "./Utils/DatabaseAccess";
import { openDatabase } from "expo-sqlite";

export type RootDrawerParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
};

const App = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  const logedInStorage = useContext(LogedInContext);
  const { UnlockPassword } = logedInStorage;
  const [password, setpassword] = useState<string | null>(null);
  const [seted, setSeted] = useState(false)

  useEffect(() => {
    setpassword(UnlockPassword);
  }, [UnlockPassword]);

  if (password !== null) {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Passwords"
            component={PasswordList}
            options={{ title: "Mis contraseñas" }}
          />
          <Drawer.Screen
            name="PasswordGen"
            component={PasswordGenerate}
            options={{ title: "Generador de contraseñas" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    
    isSet().then((value) => {
      setSeted(value!);
    });
    if (seted) {
      return <SignIn />;
    } else {
      startDatabaseIfNot();
      return <SingUp />;
    }
  }
};

export default observer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
