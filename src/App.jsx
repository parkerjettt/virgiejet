
import Navbar from './Components/Navbar';
import Category from './Components/Category'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Subcategory from './Pages/Subcategory';


const App = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Category /> } />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/lipstick" element={<Subcategory />} />
      </Routes>
    </Router>
  );
};

export default App;