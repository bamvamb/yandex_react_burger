import { tabsSlice, initialState} from './tabs';
import {ITabState} from './types'


describe('tagsSlice', () => {
  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(tabsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
    });
  });

  describe('reducers', () => {
    describe('setContainerScrollTop', () => {
      it('should set the container scroll top', () => {
        const action = tabsSlice.actions.setContainerScrollTop(100);
        const nextState = tabsSlice.reducer(initialState, action);

        expect(nextState.containerScrolTop).toBe(100);
      });
    });

    describe('setElementPosition', () => {
      it('should set the element position', () => {
        const action = tabsSlice.actions.setElementPosition({
          type: 'test',
          top: 200,
        });

        const nextState = tabsSlice.reducer(initialState, action);

        expect(nextState.elementsTop).toEqual({ test: 200 });
      });

      it('should update the element position if it already exists', () => {
        const action = tabsSlice.actions.setElementPosition({
          type: 'test',
          top: 200,
        });

        const nextState = tabsSlice.reducer(initialState, action);
        expect(nextState.elementsTop).toEqual({ test: 200 });
      });
    });
  });
});