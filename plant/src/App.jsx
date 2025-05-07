import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import './App.css'
import Dashboard from './components/Dashboard'
import Display from './components/Display'
import Admin from './components/Admin'
import Detail from './components/Detail'

function App() {


  return (
    <>
    <Router>
     <Navbar/>
     <Routes>
      <Route path = "/" element={<Dashboard/>}></Route>
      <Route path = "/display" element={<Display/>}></Route>
      <Route path = "/admin" element={<Admin/>}></Route>
      <Route path = "detail/:id" element={<Detail/>}></Route>
     </Routes>
    </Router>
    </>
  )
}

export default App;
