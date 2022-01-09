import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const { height: SCREEN_HEIGTH } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ListTitle = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  align-items: center;
  margin-right: 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HMovie = styled.View`
  margin-bottom: 30px;
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  width: 80%;
  margin-left: 15px;
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

const API_KEY = "a721dd910292becd0d78ed436463db21";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

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

  return isLoading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container>
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
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
        >
          {trending.map(({ id, poster_path, title, vote_average }) => (
            <Movie key={id}>
              <Poster path={poster_path} />
              <Title>
                {title.slice(0, 13)}
                {title.length > 13 && "..."}
              </Title>
              <Votes>
                {vote_average > 0
                  ? `⭐️ ${vote_average} / 10`
                  : "Coming soon..."}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map(({ id, poster_path, title, overview, release_date }) => (
        <HMovie key={id}>
          <Poster path={poster_path} />
          <HColumn>
            <Title>{title}</Title>
            <Release>
              {new Date(release_date).toLocaleDateString("ko", {
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
      ))}
    </Container>
  );
};

export default Movies;