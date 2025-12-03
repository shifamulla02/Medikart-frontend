import React from 'react';
import { Link } from 'react-router-dom';
 

const Navbar = () => {
  return (
    <div className="nav">
      <img src="/lala.png" alt="Logo" className="logo" />
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;
