export const OPEN_MOBILE_NAV = 'mobileNav/open';
export const CLOSE_MOBILE_NAV = 'mobileNav/closed';

const mobileNavOptions = [OPEN_MOBILE_NAV, CLOSE_MOBILE_NAV] as const;
type IMobileNavOptions = typeof mobileNavOptions[number];

export const setMobileNav = (type: IMobileNavOptions) => ({
  type,
  payload: type === OPEN_MOBILE_NAV ? OPEN_MOBILE_NAV : CLOSE_MOBILE_NAV,
});
