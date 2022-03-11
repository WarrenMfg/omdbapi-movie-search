export const OPEN = 'mobileNav/open';
export const CLOSED = 'mobileNav/closed';

const mobileNavOptions = [OPEN, CLOSED] as const;
type IMobileNavOptions = typeof mobileNavOptions[number];

export const setMobileNav = (type: IMobileNavOptions) => ({
  type,
  payload: type === OPEN ? OPEN : CLOSED,
});
