import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchProducts } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import { showNotification } from '../features/notificationSlice';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const productsStatus = useAppSelector((state) => state.products.status);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (id: string, name: string, price: number, quantity: number) => {
    dispatch(addToCart({ id, name, price, quantity }));
    dispatch(showNotification({
      message: `${name} (${quantity} шт.) добавлен в корзину`,
      type: 'success'
    }));
  };

  return (
    <div className={styles.container}>
      {productsStatus === 'loading' && (
        <p className={styles.loading}>
          Загрузка товаров...
        </p>
      )}

      {productsStatus === 'failed' && (
        <p className={styles.error}>
          Ошибка при загрузке товаров
        </p>
      )}

      {productsStatus === 'succeeded' && (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage; 