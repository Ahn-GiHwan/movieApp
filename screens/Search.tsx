import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { searchApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

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
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    isLoading: moviesLoding,
    data: moviesData,
    refetch: moviesSearch,
  } = useQuery(["searchMovies", query], searchApi.movies, { enabled: false });
  const {
    isLoading: tvsLoading,
    data: tvsData,
    refetch: tvsSearch,
  } = useQuery(["searchTvs", query], searchApi.tvs, {
    enabled: false,
  });

  const onChangeQuery = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (!query) return;
    moviesSearch();
    tvsSearch();
  };

  const isLoading = moviesLoding || tvsLoading;

  return (
    <Container>
      <SearchBar
        onChangeText={onChangeQuery}
        value={query}
        onSubmitEditing={onSubmit}
      />
      {isLoading && <Loader />}
      {moviesData && <HList title="Movie Results" data={moviesData.results} />}
      {tvsData && <HList title="TV Results" data={tvsData.results} />}
    </Container>
  );
};

export default Search;
