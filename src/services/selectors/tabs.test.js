import { selectCurrentType } from './tabs';
import { tabsSlice } from '../slices/tabs/tabs'

describe('selectCurrentType', () => {
    it('should return the key of the element closest to the container scroll top', () => {
        const state = {
            tabs: {
                elementsTop: {
                    'tab-1': 100,
                    'tab-2': 200,
                    'tab-3': 300,
                },
                containerScrolTop: 220,
            },
        };
        expect(selectCurrentType(state)).toBe('tab-2');
    });

    it('should return the first key if no elements are closer to the container scroll top', () => {
        const state = {
            [tabsSlice.reducerPath]: {
                elementsTop: {
                'tab-1': 100,
                'tab-2': 200,
                'tab-3': 300,
                },
                containerScrolTop: 50,
            }
        }
        expect(selectCurrentType(state)).toBe('tab-1');
    });

  it('should return an empty string if elementsTop is empty', () => {
    const state = {
        [tabsSlice.reducerPath]: {
            elementsTop: {},
            containerScrolTop: 100,
        },
    };

    expect(selectCurrentType(state)).toBe('');
  });
});