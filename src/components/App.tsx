import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header'
import styles from './App.module.css';
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';
import ProfilePage from './pages/profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_ls_user_info } from '../services/apis/auth';
import { authSuccess } from '../services/slices/user';
import { OnlyUnauthorised, Authorised } from './share/protected-route'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = get_ls_user_info()
    if(user){
      dispatch(authSuccess(user))
    }
  }, [])


  return (
    <div className={styles.App}>
      <Router>
        <AppHeader/>
        <main className={styles.main}>
            <Routes>
              <Route path="/" element={
                <Authorised element={
                  <HomePage />
                }/>
              }/>
              <Route path="/profile" element={
                <Authorised element={
                  <ProfilePage/>
                }/>
              }/>
              <Route path="/ingredients/:id" element={
                <Authorised element={
                  <div>ingredients</div>}
                />}
              />
              <Route path="/login" element={
                <OnlyUnauthorised element={
                  <LoginPage/>
                }/>
              }/>
              <Route path="/register" element={
                <OnlyUnauthorised element={
                  <RegisterPage/>}
                />}
              />
              <Route path="/forgot-password" element={
                <OnlyUnauthorised element={
                  <ForgotPasswordPage/>
                }/>}
              />
              <Route path="/reset-password" element={
                <OnlyUnauthorised element={
                  <ResetPasswordPage/>
                }/>
              }/>
              <Route path="*" element={<div>Not found 404</div>}/>
            </Routes>
        </main>
      </Router>
      <div id="modal-root" className={styles.app_modals}></div>
    </div>
  );
}

export default App;
