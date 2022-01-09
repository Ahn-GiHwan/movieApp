import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, View } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const { height: SCREEN_HEIGTH } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ListTitle = styled.Text`
  margin-left: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const API_KEY = "a721dd910292becd0d78ed436463db21";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setIsLoading(false);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
      )
    ).json();

    setNowPlaying(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`
      )
    ).json();

    setUpcoming(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
      )
    ).json();
    setTrending(results);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  const renderVMedia = ({ item }) => {
    return (
      <VMedia
        posterPath={item.poster_path}
        title={item.title}
        voteAverage={item.vote_average}
      />
    );
  };

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      title={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item) => String(item.id);

  return isLoading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            loop={true}
            autoplay={true}
            autoplayTimeout={3.5}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGTH / 4,
              marginBottom: 30,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                movieTitle={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            ></TrendingScroll>
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
