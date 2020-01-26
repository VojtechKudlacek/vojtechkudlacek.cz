import * as types from './actionTypes';

export const setScreenChaning = (isChanging: boolean): ReducerAction => ({ type: types.SET_SCREEN_CHANGING, payload: isChanging });
