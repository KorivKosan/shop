import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import { hideNotification } from './features/notificationSlice';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import { NotificationContainer } from './components/Notification';

function App() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notification.notifications);

  return (
    <Router>
      <div>
        <Navigation />
        <div style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <NotificationContainer
          notifications={notifications}
          onClose={(id) => dispatch(hideNotification(id))}
        />
      </div>
    </Router>
  );
}

export default App;
