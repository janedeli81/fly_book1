import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import BookingPage from './pages/BookingPage';

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<RegistrationPage />} />
              <Route path="/booking" element={<BookingPage />} />
          </Routes>
      </BrowserRouter>

  );
}


