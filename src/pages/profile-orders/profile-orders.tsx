import { useDispatch, useSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders } from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.data)

  useEffect (() => {
    dispatch(getOrders())
  }, [dispatch])

  return <ProfileOrdersUI orders={orders} />;
};
