import React from 'react';
import { Link } from 'react-router';
import glamorous from 'glamorous';

StyledUL = glamorous.ul({
  display: "flex",
  justifyContent: "space-around",
  listStyleType: "none"
});

StyledLink = glamorous(Link)({
  color: "inherit",
  textDecoration: "none"
})

const Nav = ({className, currentUser}) => 
  <nav className={`${className} main-nav`}>
    <StyledUL>
      <li><StyledLink to="/">Home</StyledLink></li>
      <li><StyledLink to="/complete-profile">Complete Profile</StyledLink></li>
      <li><StyledLink to="/search">Search</StyledLink></li>
      <li><StyledLink to={`/users/${currentUser.slug}`}>Profile</StyledLink></li>
      <li><StyledLink to={`/users/${currentUser.slug}/edit`}>Profile Edit</StyledLink></li>
      <li onClick={ () => Meteor.logout(() => window.location.reload() ) }>Sign Out </li>
    </StyledUL> 
  </nav>


export default Nav;

