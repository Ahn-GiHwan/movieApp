import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = ({ navigation }) => {
  const isDark = useColorScheme() === "dark" && true;
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? "pink" : "skyblue",
        },
        headerTintColor: "black",
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
