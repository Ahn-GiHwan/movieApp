import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaPorps {
  posterPath: string,
  title: string,
  voteAverage: number
}

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

const VMedia: React.FC<VMediaPorps> = ({ posterPath, title, voteAverage }) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {title.slice(0, 8)}
        {title.length > 8 && "..."}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
