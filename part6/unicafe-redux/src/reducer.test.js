import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };

    deepFreeze(initialState);
    const newState = counterReducer(initialState, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });
  test('ok is incremeneted', () => {
    const action = {
      type: 'OK',
    };

    deepFreeze(initialState);
    const newState = counterReducer(initialState, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });
  test('bad is incremeneted', () => {
    const action = {
      type: 'BAD',
    };

    deepFreeze(initialState);
    const newState = counterReducer(initialState, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });
  test('state is reset when ZERO is pass as action type', () => {
    const action = {
      type: 'ZERO',
    };

    deepFreeze(initialState);
    const stateAfterGood = counterReducer(initialState, { type: 'good' });
    const stateAfterZero = counterReducer(stateAfterGood, action);
    expect(stateAfterZero).toEqual(initialState);
  });
});
