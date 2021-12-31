import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// This is List Screen

type Props = {};
type Movie = {
	id: string;
	label: string;
	isComplete: boolean;
};

const Home: React.FC<Props> = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [newMovieLabel, setNewMovieLabel] = useState('');

	const handleNewMovieLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMovieLabel(e.target.value);

	const handleNewMovieKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newMovieLabel !== '') {
			setMovies((movies) => [
				...movies,
				{ id: nanoid(), label: newMovieLabel, isComplete: false },
			]);
			setNewMovieLabel('');
		}
	};

	const handleCompleteChange =
		(handledMovie: Movie) => (e: ChangeEvent<HTMLInputElement>) => {
			setMovies((movies) =>
				movies.map((movie) => {
					if (movie.id === handledMovie.id)
						return { ...movie, isComplete: e.target.checked };
					return movie;
				})
			);
		};
	const handleWatchedClick = () => {
		//update tasks array and keep values where iscomplete is false
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
