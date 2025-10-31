import {
    initialState,
    getUser,
    updateUser,
    register,
    login,
    logout,
  } from '../src/slices/userSlice';
  
  import reducer from '../src/slices/userSlice';
  
  const userMock = {
    email: 'user@mail.com',
    name: 'UserName'
  };
  
  const loginMock = {
    email: 'user@mail.com',
    password: 'Pass'
  };
  
  const registerMock = {
    email: 'user@mail.com',
    name: 'UserName',
    password: 'Pass'
  };
  
  describe('Тест userReducer', () => {
    describe('register', () => {
      test('register.pending', () => {
        const state = reducer(initialState,register.pending('pending', registerMock));
  
        expect(state.registerError).toBeUndefined();
      });
  
      test('test register.fulfilled', () => {
        const state = reducer(initialState,register.fulfilled(userMock, 'fulfilled', registerMock));
  
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.registerError).toBeUndefined();
        expect(state.data).toEqual(userMock);
      });
  
      test('test register.rejected', () => {
        const error = 'register.rejected';
  
        const state = reducer(initialState,
          register.rejected(new Error(error), 'rejected', registerMock)
        );
  
        expect(state.registerError?.message).toEqual(error);
      });
    });
  
    describe('test login', () => {
      test('login.pending', () => {
        const state = reducer(initialState,login.pending('pending', loginMock));
        expect(state.loginError).toBeUndefined();
      });
  
      test('login.fulfilled', () => {
        const state = reducer(initialState,login.fulfilled(userMock, 'fulfilled', loginMock));
  
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.loginError).toBeUndefined();
        expect(state.data).toEqual(userMock);
      });
  
      test('login.rejected', () => {
        const error = 'login.rejected';
        const state = reducer(initialState,login.rejected(new Error(error), 'rejected', loginMock));

        expect(state.loginError?.message).toEqual(error);
      });
    });
  
    describe('logout', () => {
      test('logout.fulfilled', () => {
        const state = reducer(initialState,logout.fulfilled({success: true}, 'fulfilled'));
  
        expect(state.isAuthenticated).toBeFalsy();
        expect(state.data).toEqual({email: '',name: ''});
      });
    });
  
    // Auth
    describe('getUser', () => {
      test('getUser.fulfilled', () => {
        const state = reducer(initialState,getUser.fulfilled(userMock, 'fulfilled'));
  
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.isAuthChecked).toBeTruthy();
        expect(state.data).toEqual(userMock);
      });
  
      test('Error: getUser.rejected', () => {
        const error = 'getUser.rejected';
        const state = reducer(initialState,getUser.rejected(new Error(error), 'rejected'));
  
        expect(state.isAuthenticated).toBeFalsy();
        expect(state.isAuthChecked).toBeTruthy();
      });
    });
  
    // Update
    describe('updateUser', () => {
      test('updateUser.fulfilled', () => {
        const state = reducer(initialState,updateUser.fulfilled(userMock, 'fulfilled', userMock));
        expect(state.data).toEqual(userMock);
      });
    });
  });