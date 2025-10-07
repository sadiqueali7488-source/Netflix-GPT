import React, { useEffect } from "react";
import { API_OPTIONS, POPULAR_MOVIES } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const response = await fetch(POPULAR_MOVIES, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
