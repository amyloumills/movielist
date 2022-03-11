import React from 'react';
import Home from './Components/Home';
import Randomize from './Components/Randomize';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from 'react-router-dom';
import NotFound from './Components/NotFound';
import { Movie } from './types';
import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import useStorage from './hooks/useStorage';

function App() {
	const [movies, setMovies] = useStorage<Movie[]>('movies', []);
	const [focusedMovieId, setFocusedMovieId] = useStorage<string | undefined>(
		'randomize',
		undefined
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

	const shuffleFocusedMovie = () => {
		setFocusedMovieId(
			shuffle(movies.filter((movie) => !movie.isComplete))[0]?.id
		);
	};

	const movieAPI = {
		addMovie,
		focusedMovie,
		movies,
		setMovies,
		shuffleFocusedMovie,
		updateMovieCompletion,
	};

	return (
		<Router>
			<nav>
				<NavLink
					to="/"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : 'normal',
					})}
				>
					List
				</NavLink>{' '}
				-{' '}
				<NavLink
					to="/random"
					style={({ isActive }) => ({
						fontWeight: isActive ? 'bold' : 'normal',
					})}
				>
					Randomize!
				</NavLink>
			</nav>
			<Routes>
				<Route path="/" element={<Home {...movieAPI} />} />
				<Route path="/random" element={<Randomize {...movieAPI} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
