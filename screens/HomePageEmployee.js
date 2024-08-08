import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrdersScreen from "./OrderScreen";
import OrderHistoryScreen from "./MenuScreen";
import ProfileScreen from "./ProfileScreen";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

const HomePageEmployee = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Data" component={OrderHistoryScreen} />
    {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
  </Tab.Navigator>
);

export default HomePageEmployee;
