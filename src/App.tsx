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
import styled from 'styled-components';
import { colors, GlobalStyle } from './styles';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 35px;
	min-height: 100vh;
`;

const Nav = styled.nav`
	display: flex;
	margin-bottom: 45px;
`;

const TabButton = styled(NavLink)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 120px;
	height: 62px;
	background: #000;
	color: #fff;
	text-decoration: none;

	&:first-child {
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
	}
	&:last-child {
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}
	&.active {
		background: ${colors.primary};
		color: #000;
	}
`;

function App() {
	const [movies, setMovies] = useStorage<Movie[]>('movies', []);
	return (
		<>
			<GlobalStyle />
			<Router>
				<MovieContext.Provider value={[movies, setMovies]}>
					<Layout>
						<Nav>
							<TabButton
								to="/"
								style={({ isActive }) => ({
									fontWeight: isActive ? 'bold' : 'normal',
								})}
							>
								List
							</TabButton>
							<TabButton
								to="/random"
								style={({ isActive }) => ({
									fontWeight: isActive ? 'bold' : 'normal',
								})}
							>
								Randomize!
							</TabButton>
						</Nav>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/random" element={<Randomize />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Layout>
				</MovieContext.Provider>
			</Router>
		</>
	);
}

export default App;
