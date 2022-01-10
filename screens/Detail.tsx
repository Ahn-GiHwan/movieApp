import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Share,
  TouchableOpacity,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { detailApi } from "../api";
import Loader from "../components/Loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

const { height: SCREEN_HEIGTH } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGTH / 4}px;
  justify-content: flex-end;
  padding: 0px 10px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Data = styled.View`
  padding: 0 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

type RootStackParamList = {
  Detail: {
    id: string;
    title: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    imdb_id: string;
  };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions, goBack },
  route: { params },
}) => {
  const isMovie = params.title ? true : false;

  const ShardButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="black" size={24} />
    </TouchableOpacity>
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.hompage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title: params.title || params.name,
      });
    } else {
      await Share.share({
        message: params.overview,
        url: homepage,
      });
    }
  };

  const BackButton = () => (
    <Ionicons name="arrow-back-outline" size={24} onPress={goBack} />
  );

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? detailApi.movieDetail : detailApi.tvDetail
  );

  useEffect(() => {
    setOptions({
      title: params.title ? "Movie" : "TV Show",
      headerLeft: BackButton,
    });
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: ShardButton,
    });
  }, [data]);

  const openYTLink = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) }}
        />
        <LinearGradient
          colors={["transparent", "#222020"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>{params.title || params.name}</Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading && <Loader />}
        {data?.videos?.results?.map((video: any) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" size={24} color={"red"} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
