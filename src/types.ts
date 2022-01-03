export type Movie = {
	id: string;
	label: string;
	isComplete: boolean;
};

export type MoviesProps = {
	addMovie: (movie: Pick<Movie, 'label'>) => void;
	focusedMovie?: Movie;
	movies: Movie[];
	setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
	shuffleFocusedMovie: () => void;
	updateMovieCompletion: (taskId: string, isComplete: boolean) => void;
};
