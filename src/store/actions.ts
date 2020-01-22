import * as types from './actionTypes';

export const setScreenChaning = (isChanging: boolean): ReducerAction => ({ type: types.SET_SCREEN_CHANGING, payload: isChanging });
export const setScreenLoading = (isLoading: boolean): ReducerAction => ({ type: types.SET_SCREEN_LOADING, payload: isLoading });
