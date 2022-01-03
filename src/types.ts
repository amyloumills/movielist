export type Movie = {
	id: string;
	label: string;
	isComplete: boolean;
};

export type MoviesProps = {
	movies: Movie[];
	setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};
