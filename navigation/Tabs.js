import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movie" component={Movie} />
      <Tab.Screen name="TV" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
