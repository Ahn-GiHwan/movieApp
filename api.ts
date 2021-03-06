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

// movieApi
const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());

const upcoming = ({ pageParam }: any) =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${pageParam}`
  ).then((res) => res.json());

const trendingMovie = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko`).then(
    (res) => res.json()
  );

// tvApi
const airingToday = () =>
  fetch(
    `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());

const topRated = () =>
  fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=1`).then(
    (res) => res.json()
  );

const trendingTv = () =>
  fetch(
    `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko&page=1`
  ).then((res) => res.json());

// searchApi
const movies = ({ queryKey }) => {
  const query = queryKey[1];
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${query}&include_adult=false`
  ).then((res) => res.json());
};

const tvs = ({ queryKey }) => {
  const query = queryKey[1];
  return fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&query=${query}&include_adult=false`
  ).then((res) => res.json());
};

// detailApi
const movieDetail = ({ queryKey }) => {
  const id = queryKey[1];
  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko&include_adult=false&append_to_response=videos,images`
  ).then((res) => res.json());
};

const tvDetail = ({ queryKey }) => {
  const id = queryKey[1];
  return fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko&include_adult=false&append_to_response=videos,images`
  ).then((res) => res.json());
};

export const moivesApi = { nowPlaying, upcoming, trending: trendingMovie };
export const tvApi = {
  airingToday,
  topRated,
  trending: trendingTv,
};
export const searchApi = { movies, tvs };
export const detailApi = { movieDetail, tvDetail };
