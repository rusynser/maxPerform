// src/components/Auth.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';

const Auth = () => {
  const [user, setUser] = useState(null);

  const handleRegister = () => {
    // В данном примере мы не обрабатываем регистрацию, так как используем localStorage
    alert('Регистрация успешна');
  };

  const handleLogin = () => {
    // В данном примере мы не обрабатываем вход, так как используем localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  };

  const handleLogout = () => {
    // В данном примере очищаем localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/home">Домой</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register onRegister={handleRegister} />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/home" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/home">
          {user ? <Home user={user} onLogout={handleLogout} /> : <Redirect to="/login" />}
        </Route>
      </div>
    </Router>
  );
};

export default Auth;
