const API_KEY = "a721dd910292becd0d78ed436463db21";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
  ).then((res) => res.json());

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=1&region=KR`
  ).then((res) => res.json());

const trending = () =>
  fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&region=KR`
  ).then((res) => res.json());

export const moivesApi = { nowPlaying, upcoming, trending };
