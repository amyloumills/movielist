import React from 'react';
import { MoviesProps } from '../types';

type Props = MoviesProps & {};

const Randomize: React.FC<Props> = ({
	focusedMovie: movie,
	shuffleFocusedMovie,
	updateMovieCompletion,
}) => {
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
