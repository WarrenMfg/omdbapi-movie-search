export const SET_ERROR = 'error/set';

export const setError = (payload: string) => ({
  type: SET_ERROR,
  payload,
});
