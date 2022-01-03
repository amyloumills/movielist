import React from 'react';
import { MoviesProps } from '../types';

type Props = MoviesProps & {};

const Randomize: React.FC<Props> = ({ movies }) => {
	const movie = movies[0];
	return movie ? <div>{movie.label}</div> : <div>No movie found</div>;
};

export default Randomize;
