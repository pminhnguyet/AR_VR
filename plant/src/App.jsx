import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import './App.css'
import Display from './components/Display'
import Admin from './components/Admin'
import Detail from './components/Detail'
import About from './components/About'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  return (
    <>
    <Router>
     <Navbar isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}/>
     <Routes>
      <Route path = "/" element={<Home/>}></Route>
      <Route path = "/gioithieu" element={<About/>}></Route>
      <Route path = "/display" element={<Display/>}></Route>
      <Route path = "/admin" element={<Admin isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}/>}></Route>
      <Route path = "detail/:id" element={<Detail/>}></Route>
     </Routes>
     <Footer/>
    </Router>
    </>
  )
}

export default App;
