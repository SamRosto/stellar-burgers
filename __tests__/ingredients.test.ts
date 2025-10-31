import { getIngredients, initialState } from '../src/slices/ingredientSlice';
  
  import reducer from '../src/slices/ingredientSlice';
  
  const ingredientsMock = [
    {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    }
  ];
  
  describe('Тест ingredientsReducer', () => {
    describe('fetchIngredients function', () => {
      test('test fetchIngredients.pending', () => {
        const state = reducer(initialState, getIngredients.pending('pending'));
        expect(state.isLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });
  
      test('test fetchIngredients.fulfilled', () => {
        const state = reducer(initialState, getIngredients.fulfilled(ingredientsMock, 'fulfilled')
        );
  
        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.data).toEqual(ingredientsMock);
      });
  
      test('test fetchIngredients.rejected', () => {
        const error = 'fetchIngredients.rejected';
        const state = reducer(initialState, getIngredients.rejected(new Error(error), 'rejected'));
  
        expect(state.isLoading).toBeFalsy();
        expect(state.error?.message).toEqual(error);
      });
    });
  });