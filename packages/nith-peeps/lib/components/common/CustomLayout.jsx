// import { Components } from 'meteor/vulcan:core';
// import HeadTags from './HeadTags.jsx';
// import UsersProfileCheck from '../users/UsersProfileCheck.jsx';
// import FlashMessages from './FlashMessages.jsx';


//--------TODO: Convert it into dumb component -------------//

import { withCurrentUser } from 'meteor/vulcan:core';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import Users from 'meteor/vulcan:users';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import withMustComplete from '../containers/withMustComplete.js';
import MustCompleteCheckRedir from '../MustCompleteCheckRedir.jsx';
import Nav from './Nav.jsx';


const StyledNav = glamorous(Nav)({
  position: "fixed",
  top: 0,
  width: "100%",
  margin: 0,
  right: 0,
  left: 0,
  zIndex: 1000
})

import React, { PropTypes, Component } from 'react';

class CustomLayout extends Component  {
  // constructor(props, context) {
  //   super(props, context);
  //   console.log("props contructor ", props);
  // }

  // componentDidMount() {
  //   console.log(document.querySelector(".accounts-ui .buttons"))
  // }

  render() {
    // const childrenWithProps = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {
    //     currentUserWithMustFields: this.props.currentUserWithMustFields
    //   })
    // })

    const { searchBg } = this.props;
    return (
      <div className="wrapper" id="wrapper" style={{
        background: searchBg
      }}>
        {this.props.currentUser ? <StyledNav currentUser={this.props.currentUser} /> :  null }
        { this.props.currentUser ?
            <MustCompleteCheckRedir currentUser={this.props.currentUser} documentId={this.props.currentUser && this.props.currentUser._id} />
          : null
        }

        {this.props.children}
      </div>
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

export default withCurrentUser(connect(mapStateToProps, null)(CustomLayout));
