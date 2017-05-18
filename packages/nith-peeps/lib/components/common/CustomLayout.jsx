// import { Components } from 'meteor/vulcan:core';
// import HeadTags from './HeadTags.jsx';
// import UsersProfileCheck from '../users/UsersProfileCheck.jsx';
// import FlashMessages from './FlashMessages.jsx';


//--------TODO: Convert it into dumb component -------------//

import { withCurrentUser } from 'meteor/vulcan:core';
import gql from 'graphql-tag';
import Users from 'meteor/vulcan:users';
import withMustComplete from '../containers/withMustComplete.js';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import MustCompleteCheckRedir from '../MustCompleteCheckRedir.jsx';
import Nav from './Nav.jsx';
import glamorous from 'glamorous';

const StyledNav = glamorous(Nav)({
  position: "fixed",
  top: 0,
  width: "100%",
  margin: 0,
  right: 0,
  left: 0
})

import React, { PropTypes, Component } from 'react';

class CustomLayout extends Component  {
  // constructor(props, context) {
  //   super(props, context);
  //   console.log("props contructor ", props);
  // }

  // componentDidMount() {
  //   const {currentUserWithMustFields} = this.props;
  //
  //   // console.log(!Users.hasCompletedProfile(currentUserWithMustFields))
  //   // console.log("currentUserWithMustFields componentDidMount ", currentUserWithMustFields._id)
  //   // console.log("Current User is", Users.getUser(currentUserWithMustFields._id))
  //
  //   if (!!currentUserWithMustFields && !Users.hasCompletedProfile(currentUserWithMustFields)) {
  //     browserHistory.push("/complete-profile");
  //     console.log("Not completed bro");
  //   } else {
  //     // browserHistory.push("/");
  //     console.log("oh yeah it's completed");
  //     // browserHistory.push("/");
  //   }
  // }

  render() {
    // const childrenWithProps = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {
    //     currentUserWithMustFields: this.props.currentUserWithMustFields
    //   })
    // })
    return (
      <div className="wrapper" id="wrapper">
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

export default withCurrentUser(CustomLayout);
