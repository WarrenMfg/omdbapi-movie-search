import { Action } from '../types';
import { CLOSED, OPEN } from './mobileNavActions';

export interface MobileNavState {
  isOpen: boolean;
}

export const mobileNavInitialState: MobileNavState = {
  isOpen: false,
};

const mobileNavReducer = (
  state = mobileNavInitialState,
  action: Action
): MobileNavState => {
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
