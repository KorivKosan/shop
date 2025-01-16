import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/authSlice';
import styles from './Navigation.module.css';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const token = useAppSelector((state) => state.auth.token);
  const userId = useAppSelector((state) => state.auth.userId);
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const users = useAppSelector((state) => state.users.users);

  const currentUser = users.find(user => user.id === userId);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Главная
        </Link>
        <Link to="/cart" className={styles.cartLink}>
          Корзина
          {totalItems > 0 && (
            <span className={styles.cartBadge}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
      
      <div className={styles.auth}>
        {token ? (
          <>
            <span className={styles.userName}>
              {currentUser?.name}
            </span>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Выйти
            </button>
          </>
        ) : (
          <Link 
            to="/auth" 
            className={styles.loginLink}
          >
            Войти
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 