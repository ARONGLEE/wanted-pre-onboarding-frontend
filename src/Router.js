import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';
import PrivateRoute from './PrivateRoute';

export default function Router() {
  // const token = localStorage.getItem('token');
  // console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<PrivateRoute isAuth conmponent={<TodoList />} />} />
        <Route path="/signin" element={<PrivateRoute isAuth={false} conmponent={<Signin />} />} />
        <Route path="/signup" element={<PrivateRoute isAuth={false} conmponent={<Signup />} />} />
      </Routes>
    </BrowserRouter>
  );
}
