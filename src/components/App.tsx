import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from './app-header/app-header'
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader/>
      <main className={styles.main}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<div>Login</div>}/>
            <Route path="/register" element={<div>Register</div>}/>
            <Route path="/forgot-password" element={<div>forgot-password</div>}/>
            <Route path="/profile" element={<div>profile</div>}/>
            <Route path="/ingredients/:id" element={<div>ingredients</div>}/>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
