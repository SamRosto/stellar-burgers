import reducer from '../src/slices/orderSlice';

import { getOrder,getOrders, createOrder, resetOrderModalData, initialState } from '../src/slices/orderSlice';
  
  
  const ordersMock = [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0945'
      ],
      _id: '6622337897ede0001d0666b5',
      status: 'done',
      name: 'ORDER_MOCK_EXAMPLE',
      number: 38321,
      createdAt: '2025-10-30T22:00:00.000Z',
      updatedAt: '2025-10-30T22:00:00.000Z',
    }
  ];
  
  describe('describe Тест ordersReducer', () => {
    test('State reset', () => {
      const tempState = {
        isOrderLoading: true,
        isOrdersLoading: true,
        orderRequest: false,
        orderModalData: ordersMock[0],
        error: null,
        data: []
      };
  
      const state = reducer(tempState, resetOrderModalData());
  
      expect(state.orderModalData).toBeNull();
      expect(state.data).toHaveLength(0);
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBeFalsy();
      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.isOrderLoading).toBeTruthy();
    });
  
    describe('describe getOrders', () => {
      test('test getOrders.pending', () => {
        const state = reducer(initialState, getOrders.pending('pending'));
  
        expect(state.isOrdersLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });
  
      test('test getOrders.fulfilled', () => {
        const state = reducer(
          initialState,
          getOrders.fulfilled(ordersMock, 'fulfilled')
        );
  
        expect(state.isOrdersLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.data).toEqual(ordersMock);
      });
  
      test('test getOrders.rejected', () => {
        const error = 'getOrders.rejected';
  
        const state = reducer(
          initialState,
          getOrders.rejected(new Error(error), 'rejected')
        );
  
        expect(state.isOrdersLoading).toBeFalsy();
        expect(state.error?.message).toEqual(error);
      });
    });
  
    describe('describe getOrder', () => {
      test('test getOrder.pending', () => {
        const state = reducer(
          initialState,
          getOrder.pending('pending', ordersMock[0].number)
        );
  
        expect(state.isOrderLoading).toBeTruthy();
      });
  
      test('test getOrder.fulfilled', () => {
        const state = reducer(
          initialState,
          getOrder.fulfilled(
            ordersMock[0],
            'fulfilled',
            ordersMock[0].number
          )
        );
  
        expect(state.isOrderLoading).toBeFalsy();
        expect(state.orderModalData).toEqual(ordersMock[0]);
      });
  
      test('test getOrder.rejected', () => {
        const error = 'getOrder.rejected';
  
        const state = reducer(
          initialState,
          getOrder.rejected(new Error(error), 'rejected', -1)
        );
  
        expect(state.isOrderLoading).toBeFalsy();
      });
    });
  
    describe('describe createOrder', () => {
      test('createOrder.pending', () => {
        const state = reducer(
          initialState,
          createOrder.pending('pending', ordersMock[0].ingredients)
        );
  
        expect(state.orderRequest).toBeTruthy();
      });
  
      test('createOrder.fulfilled', () => {
        const state = reducer(
          initialState,
          createOrder.fulfilled(
            { 
              success: true,
              order: ordersMock[0], 
              name: 'ORDER_EXAMPLE' 
            },
            'fulfilled',
            ordersMock[0].ingredients
          )
        );
  
        expect(state.orderRequest).toBeFalsy();
        expect(state.orderModalData).toEqual(ordersMock[0]);
      });
  
      test('createOrder.rejected', () => {
        const error = 'createOrder.rejected';
  
        const state = reducer(
          initialState,
          createOrder.rejected(new Error(error), 'rejected', [])
        );
  
        expect(state.orderRequest).toBeFalsy();
      });
    });
  });