import { useContext, useEffect, useState } from 'react';
import useStorage from './useStorage';
import { Movie } from '../types';
import { nanoid } from 'nanoid';
import { shuffle } from 'lodash';
import MovieContext from '../contexts/movieStore';

const useMovieStore = () => {
	const [movies, setMovies] = useContext(MovieContext);

	const [focusedMovieId, setFocusedMovieId] = useState<string | undefined>(
		movies.filter((movie) => !movie.isComplete)[0]?.id
	);

	const addMovie = (movie: Pick<Movie, 'label'>) => {
		const id = nanoid();
		setMovies((movies) => [
			...movies,
			{ id, label: movie.label, isComplete: false },
		]);
		if (!focusedMovieId) setFocusedMovieId(id);
	};

	const updateMovieCompletion = (movieId: string, isComplete: boolean) => {
		setMovies((movies) =>
			movies.map((movie) => {
				if (movie.id === movieId) return { ...movie, isComplete };
				return movie;
			})
		);
	};

	const focusedMovie = movies.find((movie) => movie.id === focusedMovieId);

	useEffect(() => {
		if (focusedMovie?.isComplete) {
			setFocusedMovieId(movies.filter((movie) => !movie.isComplete)[0].id);
		}
	}, [movies, focusedMovie]);

	const shuffleFocusedMovie = () => {
		setFocusedMovieId(
			shuffle(movies.filter((movie) => !movie.isComplete))[0]?.id
		);
	};

	const api = {
		addMovie,
		focusedMovie,
		movies,
		setMovies,
		shuffleFocusedMovie,
		updateMovieCompletion,
	};
	return api;
};
export default useMovieStore;
