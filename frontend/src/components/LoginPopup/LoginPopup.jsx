// import React, { useContext, useEffect, useState } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';
// import { Eye, EyeOff } from 'lucide-react';

// const LoginPopup = ({ setShowLogin }) => {
//   const { url, setToken,setUser ,setIsLogged,isLogged,user} = useContext(StoreContext);

//   const [currState, setCurrState] = useState('Login');
//   const [data, setData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [notification, setNotification] = useState(null); 
//   const [formVisible, setFormVisible] = useState(true); 


//   useEffect(() => {
//     localStorage.setItem("isLogged", isLogged);
//     localStorage.setItem("User", JSON.stringify(user));
//   }, [isLogged])
  


//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => {
//       setNotification(null);
//       setShowLogin(false);
//     }, 2000); 
//   };

//   // const onChangeHandler = (event) => {
//   //   const name = event.target.name;
//   //   const value = event.target.value;
//   //   setData((data) => ({ ...data, [name]: value }));
//   // };
//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
  
//     if (name === "name") {
//       // Allow only alphabets and spaces
//       if (!/^[a-zA-Z\s]*$/.test(value)) return;
//     }
  
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };
  

//   const onLogin = async (event) => {
//     event.preventDefault();
  
//     if (currState === 'Sign Up') {
//       const strongPasswordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//       if (!strongPasswordRegex.test(data.password)) {
//         showNotification(
//           'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
//           'error'
//         );
//         return;
//       }
//       if (data.password !== data.confirmPassword) {
//         showNotification('Passwords do not match.', 'error');
//         return;
//       }
//     }
  
//     let newUrl = url;
//     if (currState === 'Login') {
//       newUrl += '/api/user/login';
//     } else {
//       newUrl += '/api/user/register';
//     }
  
//     try {
//       const response = await axios.post(newUrl, data);
//       if (response.data.success) {
//         if (currState === 'Login') {
//           setToken(response.data.token);
//           localStorage.setItem('token', response.data.token);
//           setIsLogged(true);
//           setUser(response.data.user);
//           showNotification('Login successful!', 'success');
//           setFormVisible(false);
//         } else {
//           showNotification('Account created successfully! Please login.', 'success');
//           setCurrState('Login'); // Switch to Login form
//           setData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form data
//         }
//       } else {
//         showNotification(response.data.message, 'error');
//       }
//     } catch (error) {
//       console.error('Error during login/register:', error);
//       showNotification('An error occurred. Please try again.', 'error');
//     }
//   };
  

//   return (
//     <div className="login-popup">
//       {notification && (
//         <div
//           className={`notification ${notification.type}`}
//           style={{
//             position: 'fixed',
//             top: '20px',
//             right: '20px',
//             backgroundColor: notification.type === 'success' ? '#4caf50' : '#f44336',
//             color: 'white',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
//             zIndex: 1000,
//           }}
//         >
//           <p>{notification.message}</p>
//         </div>
//       )}
//       {formVisible && (
//         <form onSubmit={onLogin} className="login-popup-container">
//           <div className="login-popup-title">
//             <h2>{currState}</h2>
//             <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
//           </div>
//           <div className="login-popup-inputs">
//             {currState === 'Login' ? null : (
//               <input
//                 name="name"
//                 onChange={onChangeHandler}
//                 value={data.name}
//                 type="text"
//                 placeholder="Your Name"
//                 required
//               />
//             )}
//             <input
//               name="email"
//               onChange={onChangeHandler}
//               value={data.email}
//               type="email"
//               placeholder="Your Email"
//               required
//             />
//             <div className="password-container">
//               <input
//                 name="password"
//                 onChange={onChangeHandler}
//                 value={data.password}
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Your Password"
//                 required
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </span>
//             </div>
//             {currState === 'Sign Up' && (
//               <div className="password-container">
//                 <input
//                   name="confirmPassword"
//                   onChange={onChangeHandler}
//                   value={data.confirmPassword}
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Confirm Password"
//                   required
//                 />
//                 <span
//                   className="toggle-password"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </span>
//               </div>
//             )}
//           </div>
//           {currState === 'Sign Up' && (
//             <p className="info-text">
//               *Food delivery and dining at restaurants are available only in Ahmedabad.
//             </p>
//           )}
//           <button type="submit">
//             {currState === 'Sign Up' ? 'Create account' : 'Login'}
//           </button>
//           {currState === 'Login' ? (
//             <p>
//               Create a new account?{' '}
//               <span onClick={() => setCurrState('Sign Up')}>Click here</span><br/><br/>
//               <span onClick={() => setCurrState('Forgot Password')}>Forgot Password?</span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{' '}
//               <span onClick={() => setCurrState('Login')}>Login here</span>
//             </p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default LoginPopup;

import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUser, setIsLogged, isLogged, user } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem('isLogged', isLogged);
    localStorage.setItem('User', JSON.stringify(user));
  }, [isLogged]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
      setShowLogin(false);
    }, 2000);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) return;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (currState === 'Sign Up') {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(data.password)) {
        showNotification('Password must meet security requirements.', 'error');
        return;
      }
      if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
      }
    }

    let newUrl = url + (currState === 'Login' ? '/api/user/login' : '/api/user/register');

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (currState === 'Login') {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          setIsLogged(true);
          setUser(response.data.user);
          showNotification('Login successful!', 'success');
          setFormVisible(false);
        } else {
          showNotification('Account created successfully! Please login.', 'success');
          setCurrState('Login');
          setData({ name: '', email: '', password: '', confirmPassword: '' });
        }
      } else {
        showNotification(response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error during login/register:', error);
      showNotification('An error occurred. Please try again.', 'error');
    }
  };

  const onForgotPassword = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post(`${url}/api/user/forgot-password`, {
    //     email: forgotPasswordEmail,
    //   });
    //   if (response.data.success) {
    //     showNotification('Password reset link sent to your email.', 'success');
    //     setCurrState('Login');
    //     setForgotPasswordEmail('');
    //   } else {
    //     showNotification(response.data.message, 'error');
    //   }
    // } catch (error) {
    //   console.error('Error during forgot password request:', error);
    //   showNotification('An error occurred. Please try again.', 'error');
    // }
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
        <form onSubmit={currState === 'Forgot Password' ? onForgotPassword : onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>

          {currState === 'Forgot Password' ? (
            <>
              <p>Enter your email address to reset your password.</p>
              <input
                name="forgotPasswordEmail"
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                value={forgotPasswordEmail}
                type="email"
                placeholder="Your Email"
                required
              />
              <button type="submit">Send Reset Link</button>
              <p>
                Remembered your password?{' '}
                <span onClick={() => setCurrState('Login')}>Login here</span>
              </p>
            </>
          ) : (
            <>
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
                  <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
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
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                )}
              </div>
              {currState === 'Sign Up' && <p className="info-text">*Service available only in Ahmedabad.</p>}
              <button type="submit">{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
              {currState === 'Login' ? (
                <p>
                  Create a new account?{' '}
                  <span onClick={() => setCurrState('Sign Up')}>Click here</span>
                  <br />
                  <br />
                  <span onClick={() => setCurrState('Forgot Password')}>Forgot Password?</span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span onClick={() => setCurrState('Login')}>Login here</span>
                </p>
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
