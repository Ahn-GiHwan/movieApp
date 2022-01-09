import React from "react";
import styled from "styled-components";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

const VMedia = ({ posterPath, title, voteAverage }) => {
  return (
    <Movie>
      <Poster path={posterPath} />
      <Title>
        {title.slice(0, 13)}
        {title.length > 13 && "..."}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
