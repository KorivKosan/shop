import React from 'react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
  };
  onAddToCart: (id: string, name: string, price: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.productName}>
        {product.name}
      </h3>
      
      <p className={styles.description}>
        {product.description}
      </p>

      <p className={styles.category}>
        {product.category}
      </p>
      
      <p className={styles.price}>
        {product.price} ₽
      </p>

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
          onClick={() => onAddToCart(product.id, product.name, product.price, quantity)}
          className={styles.addButton}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 