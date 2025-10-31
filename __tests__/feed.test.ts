import { getFeeds, initialState } from '../src/slices/feedSlice';

import reducer from '../src/slices/feedSlice';

const feedsMock = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тест feedsReducer', () => {
  describe('test fetchFeeds.pending', () => {
    test('Начало запроса: fetchFeeds.pending', () => {
      const state = reducer(initialState, getFeeds.pending('pending'));

      expect(state.error).toBeNull();
    });

    test('test fetchFeeds.fulfilled', () => {
      const state = reducer(initialState, getFeeds.fulfilled(feedsMock, 'fulfilled'));

      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMock);
    });

    test('test fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';
      const state = reducer(initialState,getFeeds.rejected(new Error(error), 'rejected'));

      expect(state.error?.message).toEqual(error);
    });
  });
});