import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Header from './components/header'
// import Footer from './components/footer'
import HomePage from '../Pages/HomePage'
import Home from '../Pages/Home'


const Routing = () => {
  return(
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  )
}

export default Routing