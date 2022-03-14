export const OPEN_MOBILE_NAV = 'mobileNav/open';
export const CLOSE_MOBILE_NAV = 'mobileNav/closed';

const mobileNavOptions = [OPEN_MOBILE_NAV, CLOSE_MOBILE_NAV] as const;
type MobileNavOptions = typeof mobileNavOptions[number];

interface SetMobileNavAction {
  type: MobileNavOptions;
  payload: string;
}

export const setMobileNav = (type: MobileNavOptions): SetMobileNavAction => ({
  type,
  payload: type === OPEN_MOBILE_NAV ? OPEN_MOBILE_NAV : CLOSE_MOBILE_NAV,
});

export type MobileNavAction = SetMobileNavAction;
