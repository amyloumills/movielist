import { useEffect, useState } from 'react';

const useStorage = <TState>(key: string, newState: TState) => {
	const [state, setState] = useState<TState>(() => {
		const stateStr = window.localStorage.getItem(key);
		return stateStr ? (JSON.parse(stateStr) as TState) : newState;
	});
	// first time initialised, checks local storage. If so, parses as json, if not, uses newstate object
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState] as const;
};

export default useStorage;
