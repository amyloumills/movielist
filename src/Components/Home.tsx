import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import ButtonIcon from '../ComponentStyles/ButtonIcon';
import Checkbox from '../ComponentStyles/Checkbox';
import Spacer from '../ComponentStyles/Spacer';
import TextButton from '../ComponentStyles/TextButton';
import useMovieStore from '../hooks/useMovieStore';
import DeleteIcon from '../Icons/DeleteIcon';
import { Movie } from '../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 460px;
`;

const List = styled.div`
	border-radius: 15px;
	background: rgba(255, 255, 255, 0.1);
	display: flex;
	flex-direction: column;
	padding: 45px 24px;
`;

const ListItem = styled.label`
	display: flex;
	align-items: center;
	font-size: 18px;
	padding: 4px 0;
`;

const DeleteButton = styled(ButtonIcon)`
	visibility: hidden;
	${ListItem}:hover & {
		visibility: visible;
	}
`;

const Input = styled.input`
	background: rgba(0, 0, 0, 0.5);
	border-radius: 15px;
	color: #fff;
	border: none;
	padding: 20px 24px;
`;

type Props = {};

const Home: React.FC<Props> = () => {
	const { addMovie, movies, setMovies, updateMovieCompletion } =
		useMovieStore();
	const [newMovieLabel, setNewMovieLabel] = useState('');

	const handleNewMovieLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMovieLabel(e.target.value);

	const handleNewMovieKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newMovieLabel !== '') {
			addMovie({ label: newMovieLabel });

			setNewMovieLabel('');
		}
	};

	const handleCompleteChange =
		(movie: Movie) => (e: ChangeEvent<HTMLInputElement>) => {
			updateMovieCompletion(movie.id, e.target.checked);
		};

	const handleMovieDeleteClick = (handledMovie: Movie) => () => {
		setMovies((movies) =>
			movies.filter((movie) => movie.id !== handledMovie.id)
		);
	};

	const handleWatchedClick = () => {
		setMovies((movies) => movies.filter((movie) => !movie.isComplete));
	};
	console.log(movies);

	return (
		<Container>
			<List>
				{movies.map((movie) => (
					<ListItem key={movie.id}>
						<Checkbox
							checked={movie.isComplete}
							onChange={handleCompleteChange(movie)}
						/>
						<Spacer width={24} />
						{movie.label}
						<Spacer flex={1} />
						<DeleteButton onClick={handleMovieDeleteClick(movie)}>
							<DeleteIcon />
						</DeleteButton>
					</ListItem>
				))}
			</List>
			<Spacer height={30} />
			<Input
				placeholder="Add Movie"
				value={newMovieLabel}
				onChange={handleNewMovieLabelChange}
				onKeyPress={handleNewMovieKeyPress}
			></Input>
			<Spacer height={45} />
			<TextButton onClick={handleWatchedClick} style={{ alignSelf: 'center' }}>
				Clear Watched Movies
			</TextButton>
		</Container>
	);
};

export default Home;
