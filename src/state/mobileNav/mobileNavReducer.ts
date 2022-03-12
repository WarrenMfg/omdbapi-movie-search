import { Action } from '../types';
import { CLOSE_MOBILE_NAV, OPEN_MOBILE_NAV } from './mobileNavActions';

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
    case OPEN_MOBILE_NAV:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_MOBILE_NAV:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default mobileNavReducer;
