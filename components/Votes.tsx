import React from "react";
import styled from "styled-components/native";

interface VotesPorps {
  voteAverage: number
}

const VoteText = styled.Text`
  margin-top: 5px;
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
`;

const Votes: React.FC<VotesPorps> = ({ voteAverage }) => (
  <VoteText>
    {voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : "Coming soon..."}
  </VoteText>
);

export default Votes;
