import store from '../src/services/store';
import { rootReducer } from '../src/services/store';

describe('Тест rootReducer', () => {
  test('rootReducer с UNKNOWN_ACTION и undefined. Возвращает предыдущее состояние хранилища', () => {
    const before = store.getState();
    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(after).toEqual(before);
  });
});