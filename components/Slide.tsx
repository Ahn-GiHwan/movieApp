import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";

const BgImg = styled.Image``;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 45%;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: ${(props) => (props.isDark ? "#dfdbdb" : "black")};
`;

interface SlideProps {
  backdropPath: string | null;
  posterPath: string | null;
  movieTitle: string;
  voteAverage: number;
  overview: string;
  fullData: any;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  movieTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();

  const goToDeatil = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDeatil}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={isDark ? "dark" : "light"}
          blurAmount={10}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{movieTitle}</Title>
              <Votes voteAverage={voteAverage} />
              <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
