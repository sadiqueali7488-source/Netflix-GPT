import React, { useEffect } from "react";
import { API_OPTIONS, TOP_RATED_MOVIES } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(TOP_RATED_MOVIES, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
