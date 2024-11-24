import { useState } from 'react'
import Navbar from './Component/Navbar'

import './App.css'
import Manager from './Component/Manager'
import Footer from './Component/Footer'


function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <>
    <Navbar/>



    <Manager/>



  

    <Footer/>
    </>
  )
}

export default App
