import React from 'react';
import Home from './Components/Home';
import Randomize from './Components/Randomize';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from 'react-router-dom';
import useStorage from './hooks/useStorage';
import NotFound from './Components/NotFound';
import MovieContext from './contexts/movieStore';
import { Movie } from './types';

function App() {
	const [movies, setMovies] = useStorage<Movie[]>('movies', []);
	return (
		<Router>
			<MovieContext.Provider value={[movies, setMovies]}>
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
					<Route path="/" element={<Home />} />
					<Route path="/random" element={<Randomize />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</MovieContext.Provider>
		</Router>
	);
}

export default App;
