import { userSlice, initialState } from './user';

describe('userSlice reducer', () => {
  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });


  it('should handle authStarted action', () => {
    const state = userSlice.reducer(initialState, userSlice.actions.authStarted());

    expect(state).toEqual({
      authorized: false,
      loading: true,
      error: false,
    });
  });


  it('should handle authSuccess action', () => {
    const payload = { name: 'John Doe', email: 'johndoe@example.com' };

    const state = userSlice.reducer(initialState, userSlice.actions.authSuccess(payload));

    expect(state).toEqual({
      authorized: true,
      loading: false,
      error: false,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });


  it('should handle authError action', () => {
    const state = userSlice.reducer(initialState, userSlice.actions.authError());

    expect(state).toEqual({
      authorized: false,
      loading: false,
      error: true,
    });
  });


  it('should handle unauthorized action', () => {
    const stateBeforeUnauthorized = {
      authorized: true,
      loading: false,
      error: false,
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    const state = userSlice.reducer(stateBeforeUnauthorized, userSlice.actions.unauthorized());

    expect(state).toEqual({
      authorized: false,
      loading: false,
      error: false,
      name: undefined,
      email: undefined,
    });
  });
});