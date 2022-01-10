import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Alert, Dimensions, FlatList } from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { moivesApi, Movie, MovieResponse } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const { height: SCREEN_HEIGTH } = Dimensions.get("window");

const Container = styled.FlatList`
  background-color: ${(props) => props.theme.mainBgColor};
` as unknown as typeof FlatList;

const ListTitle = styled.Text`
  margin-left: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moivesApi.nowPlaying);

  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moivesApi.trending);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moivesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onRefresh = () => {
    setRefreshing(true);
    queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const renderHMedia = ({ item }: any) => (
    <HMedia
      posterPath={item.poster_path}
      title={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );

  const movieKeyExtractor = (item: Movie) => String(item.id);

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return loading ? (
    <Loader />
  ) : (
    <Container
      onEndReached={loadMore}
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                movieTitle={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
              />
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData?.results} />
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
