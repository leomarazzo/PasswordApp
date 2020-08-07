import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, Platform, View, ActivityIndicator } from "react-native";
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
import { Icon } from "react-native-elements";
import info from "./Screens/Info";

export type RootDrawerParamList = {
  Passwords: undefined;
  PasswordGen: undefined;
  Info: undefined;
};

const App: React.FC = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  const logedInStorage = useContext(LogedInContext);
  const { UnlockPassword } = logedInStorage;
  const [password, setpassword] = useState<string | null>(null);
  const [seted, setSeted] = useState<boolean | null>(null);

  useEffect(() => {
    startDatabaseIfNot();
    isSet().then((value) => {
      setSeted(value);
    })
    setpassword(UnlockPassword);
  }, [UnlockPassword, seted]);

  if (password !== null) {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Passwords"
            component={PasswordList}
            options={{
              title: "Mis contraseñas",
              drawerIcon: (props) => <Icon name="lock" />,
            }}
          />
          <Drawer.Screen
            name="PasswordGen"
            component={PasswordGenerate}
            options={{
              title: "Generador de contraseñas",
              drawerIcon: (props) => <Icon name="create" />,
            }}
          />
          <Drawer.Screen
            name="Info"
            component={info}
            options={{
              title: "Info",
              drawerIcon: (props) => <Icon name="info" />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    if (seted != null){
      if (seted) {
        return <SignIn />;
      } else {
        return <SingUp />;
      }
    }else{
      return (<View>
        <ActivityIndicator />
      </View>)
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
