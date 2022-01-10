import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";

const { height: SCREEN_HEIGTH } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGTH / 4}px;
  justify-content: flex-end;
  padding: 0px 10px;
`;

const Background = styled.Image``;

type RootStackParamList = {
  Detail: {
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title: params.title || params.name,
    });
  }, []);

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) }}
        />
        <Poster path={params.poster_path} />
      </Header>
    </Container>
  );
};

export default Detail;
