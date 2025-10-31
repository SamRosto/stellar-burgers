import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch()
  /** TODO: взять переменную из стора */
  // const {data} = useSelector(state => state.feed)
  const orders = useSelector(state => state.feed.data.orders)

  useEffect(() => {
    dispatch(getFeeds()).unwrap();
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds())
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
