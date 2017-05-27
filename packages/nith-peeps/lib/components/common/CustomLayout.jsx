// import { Components } from 'meteor/vulcan:core';
// import HeadTags from './HeadTags.jsx';
// import UsersProfileCheck from '../users/UsersProfileCheck.jsx';
// import FlashMessages from './FlashMessages.jsx';


//--------TODO: Convert it into dumb component -------------//


import React, { Component } from 'react';
import { withCurrentUser } from 'meteor/vulcan:core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import Users from 'meteor/vulcan:users';
import { browserHistory, withRouter } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import BurgerMenu from 'react-burger-menu';

import withMustComplete from '../containers/withMustComplete.js';
import MustCompleteCheckRedir from '../MustCompleteCheckRedir.jsx';
// import Nav from './Nav.jsx';

import mediaQueries from '../../modules/media-queries.js';
// import 'glamor/reset';


// const StyledNav = glamorous(Nav)({
//   position: "fixed",
//   top: 0,
//   width: "100%",
//   margin: 0,
//   right: 0,
//   left: 0,
//   zIndex: 1000
// })

const LayoutWrapper = glamorous.div({
  height: "100%",
  [mediaQueries.default]: {
    // height: "100%"
  }
}, ({location, searchBg}) => ({
   background: location.pathname === "/search" ? searchBg: ''
}))

StyledUL = glamorous.ul({
  display: "flex",
  justifyContent: "space-around",
  listStyleType: "none"
});

StyledLink = glamorous(Link)({
  color: "inherit",
  textDecoration: "none"
})

 
const YeComponent = ({currentUser}) => {
  console.log(currentUser);
  const Menu = BurgerMenu['slide'];
  return (
    <Menu className="ham-menu" id={'slide'} pageWrapId={'wrapper'} outerContainerId={'react-app'} left>
      <StyledUL>
        <li><StyledLink to="/">Home</StyledLink></li>
        <li><StyledLink to="/complete-profile">Complete Profile</StyledLink></li>
        <li><StyledLink to="/search">Search</StyledLink></li>
        <li><StyledLink to={`/users/${currentUser.slug}`}>Profile</StyledLink></li>
        <li><StyledLink to={`/users/${currentUser.slug}/edit`}>Profile Edit</StyledLink></li>
        <li onClick={ () => Meteor.logout(() => window.location.reload() ) }>Sign Out </li>
      </StyledUL> 
    </Menu>
  )
}

class CustomLayout extends Component  {
  // constructor(props, context) {
  //   super(props, context);
  //   console.log("props contructor ", props);
  // }

  // componentDidMount() {
  //   console.log(document.querySelector(".accounts-ui .buttons"))
  // }

  render() {
    const { searchBg, location, currentUser } = this.props;


    return (
      <LayoutWrapper className="wrapper" id="wrapper" location={location} searchBg={searchBg}>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        { currentUser ? <YeComponent currentUser={currentUser}/>: null}
        { currentUser ?
            <MustCompleteCheckRedir currentUser={currentUser} documentId={currentUser && currentUser._id} />
          : null
        }

        {this.props.children}
      </LayoutWrapper>
    )
  }
}

// registerComponent('Layout', Layout, withCurrentUser);

// const mustCompleteFragment = gql`
//   fragment UsersMustCompleteFragment on User {
//     _id
//     ${Users.getRequiredFields().join('\n')}
//   }
// `
//
// const options = {
//   collection: Users,
//   queryName: 'usersMustCompleteQuery',
//   fragment: mustCompleteFragment,
// };

CustomLayout.propTypes = {
  searchBg: PropTypes.string.isRequired
}

const mapStateToProps = state => ({ searchBg: state.searchBg, });

export default withRouter(withCurrentUser(connect(mapStateToProps, null)(CustomLayout)));
