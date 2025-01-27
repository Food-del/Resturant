import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null); 
  const [formVisible, setFormVisible] = useState(true); 

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
      setShowLogin(false);
    }, 2000); 
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (currState === 'Sign Up') {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(data.password)) {
        showNotification(
          'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
          'error'
        );
        return;
      }
      if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
      }
    }

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        showNotification('Login successful!', 'success');
        setFormVisible(false); 
      } else {
        showNotification(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error during login/register:', error);
      showNotification('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="login-popup">
      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: notification.type === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <p>{notification.message}</p>
        </div>
      )}
      {formVisible && (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === 'Login' ? null : (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your Name"
                required
              />
            )}
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your Email"
              required
            />
            <div className="password-container">
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={showPassword ? 'text' : 'password'}
                placeholder="Your Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {currState === 'Sign Up' && (
              <div className="password-container">
                <input
                  name="confirmPassword"
                  onChange={onChangeHandler}
                  value={data.confirmPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            )}
          </div>
          {currState === 'Sign Up' && (
            <p className="info-text">
              *Food delivery and dining at restaurants are available only in Ahmedabad.
            </p>
          )}
          <button type="submit">
            {currState === 'Sign Up' ? 'Create account' : 'Login'}
          </button>
          {currState === 'Login' ? (
            <p>
              Create a new account?{' '}
              <span onClick={() => setCurrState('Sign Up')}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setCurrState('Login')}>Login here</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
