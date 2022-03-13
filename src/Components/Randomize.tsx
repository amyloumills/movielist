import React from 'react';
import styled from 'styled-components';
import Button from '../ComponentStyles/Button';
import Spacer from '../ComponentStyles/Spacer';
import TextButton from '../ComponentStyles/TextButton';
import useMovieStore from '../hooks/useMovieStore';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`;

const Movie = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32px;
	padding-bottom: 45px;
`;

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
		<Container>
			<Movie>{movie.label}</Movie>
			<Button onClick={handleMarkCompleted}>Mark Complete</Button>
			<Spacer height={45} />
			<TextButton onClick={shuffleFocusedMovie}>Not feeling it</TextButton>
		</Container>
	) : (
		<div>No unwatched movies found</div>
	);
};

export default Randomize;
