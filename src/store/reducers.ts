import * as types from './actionTypes';
import { projects as projectList } from './defaultState';

export const sceneChanging = (state: boolean = false, action: ReducerAction) => {
	if (action.type === types.SET_SCREEN_CHANGING) {
		return action.payload;
	}
	return state;
};

export const projects = (state: Array<Project> = projectList) => {
	// Projects are read-only
	return state;
};
