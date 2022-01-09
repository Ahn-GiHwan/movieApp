import React from "react";
import styled from "styled-components/native";

const VoteText = styled.Text`
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
`;

const Votes = ({ voteAverage }) => (
  <VoteText>
    {voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : "Coming soon..."}
  </VoteText>
);

export default Votes;
