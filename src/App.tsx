import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Form from './Form';
import View from './View/View';
import ViewItem from './ViewItem';
import Header from './SharedComponents/Header';
import './App.css';

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<View />} />
      <Route path='/view' element={<View />} />
      <Route path='/view/:id' element={<ViewItem />} />
      <Route path='/create' element={<Form />} />
      <Route path='/edit/:id' element={<Form />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
