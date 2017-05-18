import React from 'react';
import { Link } from 'react-router';

const Nav = () => 
  <nav className="main-nav">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/complete-profile">Complete Profile</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><Link to="/users/arihant-verma">Profile</Link></li>
      <li><Link to="/users/arihant-verma/edit">Profile Edit</Link></li>
    </ul>
  </nav>


export default Nav;