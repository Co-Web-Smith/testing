import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx'
import InstantMeeting from './components/InstantMeeting.jsx'

function App() {

  return(
    <>
         <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/InstantMeeting" element={<InstantMeeting />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App





 
