import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroPage from "./screens/IntroPage";
import HomePageEmployee from "./screens/HomePageEmployee";
import CustomerLogin from "./screens/CustomerLogin";
import EmployeeLogin from "./screens/EmployeeLogin";
import OrderPage from "./screens/OrderPage";
import { StyleSheet } from "react-native";

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

// Register the main component
const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
  });

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator
              initialRouteName="IntroPage"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="IntroPage"
                component={IntroPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomePageEmployee"
                component={HomePageEmployee}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CustomerLogin"
                component={CustomerLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EmployeeLogin"
                component={EmployeeLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrderPage"
                component={OrderPage}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
