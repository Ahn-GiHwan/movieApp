import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaPorps {
  posterPath: string;
  title: string;
  voteAverage: number;
  fullData: any;
}

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

const VMedia: React.FC<VMediaPorps> = ({
  posterPath,
  title,
  voteAverage,
  fullData,
}) => {
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
    <TouchableOpacity onPress={goToDeatil}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {title.slice(0, 8)}
          {title.length > 8 && "..."}
        </Title>
        <Votes voteAverage={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
