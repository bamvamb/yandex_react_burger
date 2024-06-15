import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header'
import styles from './App.module.css';
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ForgotPasswordPage from './pages/forgot-password';
import ResetPasswordPage from './pages/reset-password';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader/>
      <main className={styles.main}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
            <Route path="/profile" element={<div>profile</div>}/>
            <Route path="/ingredients/:id" element={<div>ingredients</div>}/>
            <Route path="*" element={<div>Not found 404</div>}/>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
