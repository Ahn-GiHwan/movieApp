import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { QueryClient, useQuery } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = new QueryClient();

  const {
    isLoading: todayIsLoading,
    data: todayData,
    isFetching: todayIsFetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);

  const {
    isLoading: topIsLoading,
    data: topData,
    isFetching: topIsFetching,
  } = useQuery(["tv", "top"], tvApi.topRated);

  const {
    isLoading: trendingIsLoading,
    data: trendingData,
    isFetching: trendingIsFetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const loading = todayIsLoading || topIsLoading || trendingIsLoading;
  const refreshing = todayIsFetching || topIsFetching || trendingIsFetching;

  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };

  if (loading) return <Loader />;
  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
