import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, useColorScheme, View } from "react-native";
import Detail from "../screens/Detail";
import { Ionicons } from "@expo/vector-icons";

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
        headerLeft: () => (
          <Ionicons
            name="arrow-back-outline"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
