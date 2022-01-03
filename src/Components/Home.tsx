import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Movie, MoviesProps } from '../types';

// This is List Screen

type Props = MoviesProps;

const Home: React.FC<Props> = ({
	addMovie,
	movies,
	setMovies,
	updateMovieCompletion,
}) => {
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
		<div>
			<div>
				{movies.map((movie) => (
					<div key={movie.id}>
						<input
							type="checkbox"
							checked={movie.isComplete}
							onChange={handleCompleteChange(movie)}
						/>
						{movie.label}
						<button onClick={handleMovieDeleteClick(movie)}>Delete</button>
					</div>
				))}
			</div>
			<input
				value={newMovieLabel}
				onChange={handleNewMovieLabelChange}
				onKeyPress={handleNewMovieKeyPress}
			></input>
			<div>
				<button onClick={handleWatchedClick}>Clear Watched Movies</button>
			</div>
		</div>
	);
};

export default Home;
