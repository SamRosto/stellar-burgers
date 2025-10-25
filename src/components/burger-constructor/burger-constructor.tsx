import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { resetOrderModalData, createOrder } from '../../slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../slices/constructorSlice';


export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector(state => state.constructorBurger)
  // console.log(constructorItems)

  const {orderRequest, orderModalData} = useSelector(state => state.order)
  const {isAuthenticated} = useSelector(state => state.user)

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if(!isAuthenticated) {
      return navigate('/login', { replace: true });
    }
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(item => item._id),
      constructorItems.bun._id
    ]

    dispatch(createOrder(data))
      .unwrap()
      .then(()=> {
        dispatch(resetState())
      })
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData())
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
