import React from 'react';
import styles from './CartItem.module.css';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity,
  onUpdateQuantity,
  onRemove
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    onUpdateQuantity(quantity - 1);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price} ₽</p>
      </div>
      
      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button 
            onClick={handleDecrement}
            className={styles.quantityButton}
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button 
            onClick={handleIncrement}
            className={styles.quantityButton}
          >
            +
          </button>
        </div>
        
        <button
          onClick={onRemove}
          className={styles.removeButton}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem; 