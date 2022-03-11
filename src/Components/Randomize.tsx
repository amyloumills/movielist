import React from 'react';
import useMovieStore from '../hooks/useMovieStore';

type Props = {};

const Randomize: React.FC<Props> = () => {
	const {
		focusedMovie: movie,
		shuffleFocusedMovie,
		updateMovieCompletion,
	} = useMovieStore();

	const handleMarkCompleted = () => {
		if (movie) updateMovieCompletion(movie.id, true);
	};

	return movie ? (
		<div>
			<div>{movie.label}</div>
			<button onClick={handleMarkCompleted}>Mark Complete</button>
			<button onClick={shuffleFocusedMovie}>Not feeling it</button>
		</div>
	) : (
		<div>No unwatched movies found</div>
	);
};

export default Randomize;
