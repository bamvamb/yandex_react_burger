import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header'
import styles from './App.module.css';
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';
import ProfilePage from './pages/profile';
import IngredientPage from './pages/ingredient';
import Feeds from './pages/feeds';
import Order from './pages/feed';
import { useEffect, useRef } from 'react';
import { getLSUserInfo } from '../services/tokens';
import { authSuccess } from '../services/slices/user/user';
import { OnlyUnauthorised, Authorised, OnlyFrom } from './share/protected-route'
import { useLocation } from 'react-router-dom';
import IngredientModal from './modals/ingredient-modal';
import ErrorView from './share/error/error';
import { useAppDispatch } from '../services/hooks';
import OrderModal from './modals/feed-modal';
import Orders from './pages/orders';
import { closeFeedsWS, closeOrdersWS } from '../services/apis/orders/orders';

function App() {
  return (
    <Router>
      <Layout/>
    </Router>
  );
}

const wss_page_routes = {
  orders: "/profile/orders",
  feeds: "/feed"
}

const Layout = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const ref = useRef<string>()
  const backgroundLocation = location.state?.backgroundLocation as Location

  useEffect(() => {
    if(ref.current === wss_page_routes.feeds){
      closeFeedsWS()
    }
    if(ref.current === wss_page_routes.orders){
      closeOrdersWS()
    }
    ref.current = location.pathname
  }, [location.pathname])

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
          <Route path="/feed" element={
             <Feeds />
          }/>
          <Route path="/feed/:number" element={
             <Order/>
          }/>
          <Route path="/profile/orders/:number" element={
             <Authorised element={
              <Order/>
            }/>
          }/>
          <Route path="/profile" element={
            <Authorised element={
              <ProfilePage/>
            }/>
          }/>
          <Route path="/profile/orders" element={
            <Authorised element={
              <Orders/>
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
          backgroundLocation && (<>
            <Route path="/ingredients/:id" element={
              <IngredientModal/>
             }/>
             <Route path="/feed/:number" element={
              <OrderModal/>
             }/>
             <Route path="/profile/orders/:number" element={
              <Authorised element={
                <OrderModal/>
              }
              />
             }/>
            </>
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
