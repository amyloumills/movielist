import React, { useState } from 'react';
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

function App() {
	const [movies, setMovies] = useState<Movie[]>([]);

	const updateMovieCompletion = (movieId: string, isComplete: boolean) => {
		setMovies((movies) =>
			movies.map((movie) => {
				if (movie.id === movieId) return { ...movie, isComplete };
				return movie;
			})
		);
	};

	const movieAPI = { movies, setMovies, updateMovieCompletion };

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
