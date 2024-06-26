import { createSelector } from '@reduxjs/toolkit';
import { RootStoreState } from '../store';

const selectTabsState = (state: RootStoreState) => state.tabs;

export const selectCurrentType = createSelector(
    selectTabsState,
    (tabsState) => Object.keys(tabsState.elementsTop).reduce( (prev, curr) => {
        if(prev === ""){ return curr }
        return Math.abs(tabsState.elementsTop[prev] - tabsState.containerScrolTop) > 
            Math.abs(tabsState.elementsTop[curr] - tabsState.containerScrolTop) ? curr : prev
    }, "")
);
