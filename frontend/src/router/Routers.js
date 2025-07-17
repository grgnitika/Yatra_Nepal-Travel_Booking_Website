import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from './../pages/Home';
import About from "../pages/About";
import Contact from '../pages/Contact';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import SearchResultList from './../pages/SearchResultList';
import Login from './../pages/Login';
import Register from './../pages/Register';
import ThankYou from '../pages/ThankYou';
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import MyBookings from '../pages/MyBookings';


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
};

export default Routers;