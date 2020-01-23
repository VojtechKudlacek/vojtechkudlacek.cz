import { useReducer } from 'react';

interface HookState {
	index: number;
	changing: boolean;
}

const initialState: HookState = { index: 0, changing: false };

const reducer = (state: HookState, action: ReducerAction): HookState => {
	const newState: HookState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case 'setIndex':
			newState.changing = false;
			newState.index = action.payload;
			break;
		case 'change':
			newState.changing = true;
			break;
		default:
			return state;
	}
	return newState;
};

export default (cooldown: number): [HookState, (index: number) => void] => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const setIndex = (index: number) => {
		if (!state.changing) {
			dispatch({ type: 'change' });
			setTimeout(() => dispatch({ type: 'setIndex', payload: index }), cooldown);
		}
	};
	return [state, setIndex];
};
