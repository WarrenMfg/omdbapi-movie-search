import wait from './wait';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('wait', () => {
  it('should wait the given number of milliseconds', () => {
    [0, 1, 10, 100, 1_000, 10_000, 100_000].forEach((ms, i) => {
      // eslint-disable-next-line testing-library/await-async-utils
      wait(ms);
      jest.advanceTimersByTime(ms);
      expect(setTimeout).toHaveBeenCalledTimes(i + 1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), ms);
    });
  });
});
