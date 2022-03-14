export const SET_ERROR = 'error/set';

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export const setError = (payload: string): SetErrorAction => ({
  type: SET_ERROR,
  payload,
});

export type ErrorAction = SetErrorAction;
