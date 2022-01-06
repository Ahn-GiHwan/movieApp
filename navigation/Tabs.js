import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import reactDom from "react-dom";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark" && true;
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "pink" : "skyblue",
        },
        headerTintColor: "black",
        tabBarStyle: {
          backgroundColor: isDark ? "pink" : "skyblue",
        },
        tabBarActiveTintColor: isDark ? "black" : "white",
        tabBarInactiveTintColor: isDark ? "white" : "gray",
      }}
    >
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
