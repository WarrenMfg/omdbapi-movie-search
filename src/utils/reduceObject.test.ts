import reduceObject from './reduceObject';

describe('reduceObject', () => {
  it('should reduce an object to the keys provided', () => {
    const obj = {
      test1: 'test1',
      test2: 'test2',
      test3: 'test3',
      test4: 'test4',
      test5: 'test5',
    };

    expect(reduceObject(obj, [])).toEqual({});
    expect(reduceObject(obj, ['test1'])).toEqual({ test1: 'test1' });
    expect(reduceObject(obj, ['test1', 'test2'])).toEqual({
      test1: 'test1',
      test2: 'test2',
    });
    expect(reduceObject(obj, ['test1', 'test2', 'test3'])).toEqual({
      test1: 'test1',
      test2: 'test2',
      test3: 'test3',
    });
    expect(reduceObject(obj, ['test1', 'test2', 'test3', 'test4'])).toEqual({
      test1: 'test1',
      test2: 'test2',
      test3: 'test3',
      test4: 'test4',
    });
    expect(
      reduceObject(obj, ['test1', 'test2', 'test3', 'test4', 'test5'])
    ).toEqual({
      test1: 'test1',
      test2: 'test2',
      test3: 'test3',
      test4: 'test4',
      test5: 'test5',
    });
    expect(reduceObject(obj, ['uno', 'dos', 'tres'])).toEqual({
      uno: undefined,
      dos: undefined,
      tres: undefined,
    });
    expect(
      reduceObject(obj, ['test1', 'test2', 'test3', 'uno', 'dos', 'tres'])
    ).toEqual({
      test1: 'test1',
      test2: 'test2',
      test3: 'test3',
      uno: undefined,
      dos: undefined,
      tres: undefined,
    });
  });
});
