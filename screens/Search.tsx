import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  /* flex: 1;
  justify-content: center;
  align-items: center; */
`;

const SearchBar = styled.TextInput.attrs({
  placeholder: "Search for Movie or TV",
  placeholderTextColor: "gray",
  returnKeyType: "search",
})`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const onChangeQuery = (text: string) => setQuery(text);

  console.log(query);

  return (
    <Container>
      <SearchBar onChangeText={onChangeQuery} value={query} />
    </Container>
  );
};

export default Search;
