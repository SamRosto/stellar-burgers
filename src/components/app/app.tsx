import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
// import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo} from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../slices/ingredientSlice';
import { getUser } from '../../slices/userSlice';
import { resetOrderModalData } from '../../slices/orderSlice';

const App: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUser())
  }, [dispatch])

  const handleModalClose = () => {
    navigate(-1)
    dispatch(resetOrderModalData())
  }

  return (
  <div className={styles.app}>
    <AppHeader />
    <Routes location={backgroundLocation || location}>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/feed/:number' element={<OrderInfo/>}/>
      <Route path='/ingredients/:id' element={<IngredientDetails />} />

      <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login/></ProtectedRoute>}/>
      <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register/></ProtectedRoute>}/>
      <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword/></ProtectedRoute>}/>
      <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders/></ProtectedRoute>}/>
      <Route path='/profile/orders/:number' element={<ProtectedRoute><OrderInfo /></ProtectedRoute>}/>
      <Route path='*' element={<ProtectedRoute onlyUnAuth><NotFound404/></ProtectedRoute>}/>
    </Routes>
    
      {backgroundLocation && (
    <Routes>
      <Route path='/ingredients/:id' element={<Modal 
        title='Детали ингредиента' onClose={handleModalClose}><IngredientDetails /></Modal>}/>

      <Route path='/profile/orders/:number' element={<ProtectedRoute>
        <Modal title={'Детали заказа'} onClose={handleModalClose}><OrderInfo /></Modal></ProtectedRoute>}/>

      <Route path='/feed/:number' element={<Modal
        title={'Детали заказа'} onClose={handleModalClose}><OrderInfo /></Modal>}/>
    </Routes>
      )}
  </div>
  );
}

export default App;
