import { createContext } from 'react';
import { Movie } from '../types';

const MovieContext = createContext<
	[Movie[], React.Dispatch<React.SetStateAction<Movie[]>>]
>([[], () => {}]);

export default MovieContext;
