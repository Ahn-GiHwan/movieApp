import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: gray;
`;

const AltImage = styled.View`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: gray;
  justify-content: center;
  align-items: center;
`;

const AltText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

const Poster = ({ path }) => {
  if (path) return <Image source={{ uri: makeImgPath(path) }} />;
  else {
    return (
      <AltImage>
        <AltText>No Image</AltText>
      </AltImage>
    );
  }
};
export default Poster;
