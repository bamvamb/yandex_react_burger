import { profileInputsSlice, setKeyValue, setKeyError, setHasChange, clearForm, initialState } from './profileForm';
import { TInputsState } from './types';

describe('profileInputsSlice', () => {
  it('should return the initial state', () => {
    expect(profileInputsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('setKeyValue', () => {
    it('should set the value of the specified key', () => {
      const action = setKeyValue({ key: 'name', value: 'John Doe' });

      const state = profileInputsSlice.reducer(initialState, action);

      expect(state.name.value).toBe('John Doe');
    });

    it('should reset the error state of the specified key', () => {
      const errorState: TInputsState = { ...initialState, name: { value: '', error: true, changed: false } };
      
      const action = setKeyValue({ key: 'name', value: 'John Doe' });
      const state = profileInputsSlice.reducer(errorState, action);

      expect(state.name.error).toBe(false);
    });
  });

  describe('setKeyError', () => {
    it('should set the error state of the specified key', () => {
      const action = setKeyError({ key: 'name', value: true });

      const state = profileInputsSlice.reducer(initialState, action);

      expect(state.name.error).toBe(true);
    });
  });

  describe('setHasChange', () => {
    it('should set the changed state of the specified key', () => {
      const action = setHasChange({ key: 'name', value: true });

      const state = profileInputsSlice.reducer(initialState, action);

      expect(state.name.changed).toBe(true);
    });
  });

  describe('clearForm', () => {
    it('should reset the state of all flags', () => {
      const dirtyState: TInputsState = {
        name: { value: '', error: true, changed: true },
        email: { value: '', error: false, changed: false },
        password: { value: '', error: false, changed: false },
      };

      const action = clearForm();
      const state = profileInputsSlice.reducer(dirtyState, action);
      
      expect(state).toEqual(initialState);
    });
  });
});