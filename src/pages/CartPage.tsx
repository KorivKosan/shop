import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import styles from './CartPage.module.css';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const token = useAppSelector((state) => state.auth.token);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleOrderSubmit = () => {
    if (!token) {
      navigate('/auth');
      return;
    }
    alert('Order submitted');
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          Корзина
        </h1>
        <div className={styles.emptyCart}>
          <p className={styles.emptyMessage}>
            Ваша корзина пуста
          </p>
          <button 
            onClick={() => navigate('/')}
            className={styles.linkButton}
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
              onRemove={() => handleRemoveFromCart(item.id)}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryContent}>
            <h2 className={styles.summaryTitle}>Итого</h2>
            <div className={styles.summaryRow}>
              <span>Товары ({totalItems})</span>
              <span>{totalPrice} ₽</span>
            </div>
            
            <button 
              onClick={handleOrderSubmit}
              className={styles.checkoutButton}
            >
              {token ? 'Оформить заказ' : 'Войти для оформления заказа'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 