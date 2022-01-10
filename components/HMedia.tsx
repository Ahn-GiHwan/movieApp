import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";

interface HMediaProps {
  posterPath: string;
  title: string;
  overview: string;
  releaseDate: string;
  fullData: any;
}

const HMovie = styled.View`
  padding: 0px 20px;
  flex-direction: row;
`;

const HColumn = styled.View`
  width: 80%;
  margin-left: 15px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

const Release = styled.Text`
  margin-vertical: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

const Overview = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.textColor};
`;

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  title,
  overview,
  releaseDate,
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
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{title}</Title>
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Release>
          <Overview>
            {overview === "" || overview.length > 130
              ? `${overview.slice(0, 130)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
