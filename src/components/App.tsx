import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header'
import styles from './App.module.css';
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';
import ProfilePage from './pages/profile';
import IngredientPage from './pages/ingredient';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_ls_user_info } from '../services/apis/auth';
import { authSuccess } from '../services/slices/user';
import { OnlyUnauthorised, Authorised, OnlyFrom } from './share/protected-route'
import { useLocation } from 'react-router-dom';
import IngredientModal from './ingredient-modal/ingredient-modal';

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

const Layout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation as Location

  useEffect(() => {
    const user = get_ls_user_info()
    if(user){
      dispatch(authSuccess(user))
    }
  }, [])

  return (
    <div className={styles.App}>
    <AppHeader/>
    <main className={styles.main}>
        <Routes location={backgroundLocation ? backgroundLocation : location}>
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
              <IngredientPage/>}
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
            <OnlyFrom onlyUnAuth={true} onlyFrom={"/forgot-password"} element={
              <ResetPasswordPage/>
            }/>
          }/>
          <Route path="*" element={<div>Not found 404</div>}/>
        </Routes>
        <Routes>
        {
          backgroundLocation && (
            <Route path="/ingredients/:id" element={
              <Authorised element={
                <IngredientModal/>
              }
              />}
            />
          )
        }
        <Route path="*" element={null}/>
        </Routes>
    </main>
  
  <div id="modal-root" className={styles.app_modals}></div>
</div>
  )
}

export default App;
