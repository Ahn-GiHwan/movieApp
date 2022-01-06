import { createNativeStackNavigator } from "@react-navigation/native-stack";
import One from "../screens/One";
import Two from "../screens/Two";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="One" component={One} />
      <NativeStack.Screen name="Two" component={Two} />
    </NativeStack.Navigator>
  );
};

export default Stack;
