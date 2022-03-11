const useMediaQueryList = (mediaQuery: string, handleOnChange: () => void) => {
  const mql = window.matchMedia(mediaQuery);
  mql.onchange = handleOnChange;
};

export default useMediaQueryList;
