import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookRide from './page/BookRide';
import HomePage from './page/HomePage';
import RideHistory from './page/RideHistory';
import Contact from './page/Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book-ride" caseSensitive={false} element={<BookRide />} />
      <Route path="/ride-history" caseSensitive={false} element={<RideHistory />} />
      <Route path="/contact" caseSensitive={false} element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
