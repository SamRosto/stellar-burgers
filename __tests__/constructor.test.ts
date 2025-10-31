import { initialState, addBun, addIngredient, removeIngredient, moveIngredient, resetState } from "src/slices/constructorSlice";
import reducer from "src/slices/constructorSlice";

const mockBun = {
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

const mockIngredients = [
    {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        id: '123',
    },
    {
      _id: "643d69a5c3f7b9001cfa0945",
      name: "Соус с шипами Антарианского плоскоходца",
      type: "sauce",
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: "https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      id: '345',
    },
];

describe('Тестирование builderReducer', () => {
    describe('Добавление булки', () => {
      test('Установка булки', () => {
        const state = reducer(initialState, addBun(mockBun));
        expect(state.bun).toEqual(mockBun);
        expect(state.ingredients).toHaveLength(0);
      });
    });
  
    describe('Ингредиенты', () => {
      test('Добавление ингредиента', () => {
        const state = reducer(initialState, addIngredient(mockIngredients[0]));
  
        // added ingredient
        expect(state.ingredients).toHaveLength(1);
  
        const updatedObject = { ...state.ingredients[0] } as Record<string, any>;
        delete updatedObject['id'];
  
        const initialObject = { ...mockIngredients[0] } as Record<string, any>;
        delete initialObject['id'];
  
        expect(updatedObject).toEqual(initialObject);

        // bun unchanged
        expect(state.bun).toBeNull();
      });
  
      test('Удаление ингредиента', () => {
        const tempState = {
          bun: null,
          ingredients: mockIngredients
        };
  
        const state = reducer(tempState, removeIngredient(mockIngredients[0].id));
  
        // Element deleteted and equals to second added 
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0]).toEqual(mockIngredients[1]);

        // bun is still null
        expect(state.bun).toBeNull();
      });
  
      describe('Движение ингредиентов. Вверх, вниз', () => {
        test('Движение вниз', () => {
          const tempState = {
            bun: null,
            ingredients: mockIngredients
          };
  
          const state = reducer(tempState, moveIngredient({ idx: 0, upwards: false }));
  
          // position change
          expect(state.ingredients).toHaveLength(2);
          expect(state.ingredients[0]).toEqual(mockIngredients[1]);
          expect(state.ingredients[1]).toEqual(mockIngredients[0]);
          
          expect(state.bun).toBeNull();
        });
  
        test('Движение вверх', () => {
          const tempState = {
            bun: null,
            ingredients: mockIngredients
          };
      
          const state = reducer(tempState, moveIngredient({ idx: 1, upwards: true }));
  
          // position change
          expect(state.ingredients).toHaveLength(2);
          expect(state.ingredients[0]).toEqual(mockIngredients[1]);
          expect(state.ingredients[1]).toEqual(mockIngredients[0]);

          expect(state.bun).toBeNull();
        });
      });
    });
  
    test('Очистка конструктора', () => {
        const tempState = {
          bun: null,
          ingredients: mockIngredients
        };
      
      const state = reducer(tempState, resetState());
  
      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toBeNull();
    });
  });