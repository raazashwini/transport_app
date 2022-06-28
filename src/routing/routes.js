import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from './components/header'
// import Footer from './components/footer'
import HomePage from "../Pages/HomePage";
import Home from "../Pages/Home";
import Travel from "../Pages/Travel";
import About from "../Pages/About";
import Reset from '../Pages/Reset';
import Account from '../Pages/Account';
import TravelDetails from "../Pages/TravelDetails";

const Routing = () => {
  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/account" element={<Account />} />
        <Route path="/travel/travel-details" element={<TravelDetails />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
};

export default Routing;
