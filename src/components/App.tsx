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
import { getLSUserInfo } from '../services/tokens';
import { authSuccess } from '../services/slices/user/user';
import { OnlyUnauthorised, Authorised, OnlyFrom } from './share/protected-route'
import { useLocation } from 'react-router-dom';
import IngredientModal from './ingredient-modal/ingredient-modal';
import ErrorView from './share/error/error';
import { useAppDispatch } from '../services/hooks';

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

const Layout = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation as Location

  useEffect(() => {
    const user = getLSUserInfo()
    if(user){
      dispatch(authSuccess(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.App}>
    <AppHeader/>
    <main className={styles.main}>
        <Routes location={backgroundLocation ? backgroundLocation : location}>
          <Route path="/" element={
             <HomePage />
          }/>
          <Route path="/profile" element={
            <Authorised element={
              <ProfilePage/>
            }/>
          }/>
          <Route path="/ingredients/:id" element={
            <IngredientPage/>
          }/>
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
          <Route path="*" element={
           //<div>Not found 404</div>
            <ErrorView text={"Страница не найдена"}/>
          }/>
        </Routes>
        <Routes>
        {
          backgroundLocation && (
            <Route path="/ingredients/:id" element={
              <IngredientModal/>
             }
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
