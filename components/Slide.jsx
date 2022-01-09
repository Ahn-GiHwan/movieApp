import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Votes from "./Votes";

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

// const Votes = styled(OverView)`
//   font-size: 12px;
// `;

const Slide = ({
  backdropPath,
  posterPath,
  movieTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
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
  );
};

export default Slide;
