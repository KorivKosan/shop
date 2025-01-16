import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const authStatus = useAppSelector((state) => state.auth.status);
  const authError = useAppSelector((state) => state.auth.error);
  const token = useAppSelector((state) => state.auth.token);

  React.useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [token, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.container}>
      <form 
        onSubmit={handleLogin}
        className={styles.form}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Пароль:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={authStatus === 'loading'}
          className={styles.submitButton}
        >
          {authStatus === 'loading' ? 'Вход...' : 'Войти'}
        </button>

        {authError && (
          <p className={styles.error}>
            {authError}
          </p>
        )}

        <p className={styles.registerLink}>
          Нет аккаунта?{' '}
          <Link to="/register">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthPage; 