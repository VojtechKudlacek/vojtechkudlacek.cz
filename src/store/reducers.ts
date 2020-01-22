import * as types from './actionTypes';

export const sceneChanging = (state: boolean = false, action: ReducerAction) => {
	if (action.type === types.SET_SCREEN_CHANGING) {
		return action.payload;
	}
	return state;
};
