import React from "react";
import styled from "styled-components";
import Poster from "./Poster";

const HMovie = styled.View`
  margin-bottom: 30px;
  padding: 0px 30px;
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

const HMedia = ({ posterPath, title, overview, releaseDate }) => {
  return (
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
  );
};

export default HMedia;
