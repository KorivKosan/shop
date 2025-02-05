import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import { hideNotification } from './features/notification/notificationSlice';
import Navigation from './components/Navigation/Navigation';
import { NotificationContainer } from './components/Notification/Notification';
import HomePage from './pages/Home/HomePage';
import CartPage from './pages/Cart/CartPage';
import AuthPage from './pages/Auth/AuthPage';
import RegisterPage from './pages/Register/RegisterPage';
import type { RootState } from './types/store';

function App() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state: RootState) => state.notification.notifications);

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
