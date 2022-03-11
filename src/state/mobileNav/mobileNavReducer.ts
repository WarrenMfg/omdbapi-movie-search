import { Action } from '../types';
import { CLOSED, OPEN } from './mobileNavActions';

export interface IMobileNavState {
  isOpen: boolean;
}

export const mobileNavInitialState: IMobileNavState = {
  isOpen: false,
};

const mobileNavReducer = (state = mobileNavInitialState, action: Action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSED:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default mobileNavReducer;
