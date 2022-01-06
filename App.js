import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { useColorScheme } from "react-native";
import { darkTheme, ligthTheme } from "./theme";

export default function App() {
  const isDark = useColorScheme() === "dark" && true;

  return (
    <ThemeProvider theme={isDark ? darkTheme : ligthTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
