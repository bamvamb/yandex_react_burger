import { createSelector } from '@reduxjs/toolkit';
import { RootStoreState } from '../store';

const selectTabsState = (state: RootStoreState) => state.tabs;

export const selectCurrentType = createSelector(
    selectTabsState,
    (tabsState) => Object.keys(tabsState.elements_top).reduce( (prev, curr) => {
        if(prev === ""){ return curr }
        return Math.abs(tabsState.elements_top[prev] - tabsState.container_scroll_top) > 
            Math.abs(tabsState.elements_top[curr] - tabsState.container_scroll_top) ? curr : prev
    }, "")
);
