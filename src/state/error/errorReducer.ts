import { ErrorAction, SET_ERROR } from './errorActions';

export interface ErrorState {
  message: string | null;
}

export const errorInitialState: ErrorState = {
  message: null,
};

const errorReducer = (
  state = errorInitialState,
  action: ErrorAction
): ErrorState => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
