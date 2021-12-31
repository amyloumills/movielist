import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { nanoid } from 'nanoid';

// This is List Screen

type Props = {};
type Movies = {
	id: string;
	label: string;
};

const Home: React.FC<Props> = () => {
	const [movies, setMovies] = useState<Movies[]>([]);
	const [newMovieLabel, setNewMovieLabel] = useState('');

	const handleNewMovieLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewMovieLabel(e.target.value);

	const handleNewMovieKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter')
			setMovies((movies) => [
				...movies,
				{ id: nanoid(), label: newMovieLabel },
			]);
	};

	return (
		<div>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>{movie.label}</li>
				))}
			</ul>
			<input
				value={newMovieLabel}
				onChange={handleNewMovieLabelChange}
				onKeyPress={handleNewMovieKeyPress}
			></input>
		</div>
	);
};

export default Home;
