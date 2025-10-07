import React, { useEffect } from "react";
import { API_OPTIONS, UPCOMING_MOVIES } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const response = await fetch(UPCOMING_MOVIES, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
