import React from 'react';
import { MoviesProps } from '../types';

type Props = MoviesProps & {};

const Randomize: React.FC<Props> = ({ movies, updateMovieCompletion }) => {
	const movie = movies[0];
	const handleMarkCompleted = () => {
		updateMovieCompletion(movie.id, true);
	};

	return movie ? (
		<div>
			<div>{movie.label}</div>
			<button onClick={handleMarkCompleted}>Mark Complete</button>
		</div>
	) : (
		<div>No movie found</div>
	);
};

export default Randomize;
