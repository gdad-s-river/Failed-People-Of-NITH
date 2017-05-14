import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import UsersProfileCheck from './users/UsersProfileCheck.jsx'
import FlashMessages from './common/FlashMessages.jsx'
import Helmet from 'react-helmet';

const links = [
  // note: modal popups won't work with anything above alpha.5.
  // see https://github.com/twbs/bootstrap/issues/21876#issuecomment-276181539
  {
    rel: 'stylesheet',
    type: 'text/css',
    href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css'
  },
  {
    rel: 'stylesheet',
    type: 'text/css',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
  }
];
// change after, with a better name

const UsersProfileCheckWrapper = ({currentUser}) => {

  return (
    <div className="users-check-wrapper" id="users-check-wrapper">

      <Helmet title="Complete Your Profile" link={links}/>
      <FlashMessages />

      { currentUser ? <UsersProfileCheck currentUser={currentUser} documentId={currentUser && currentUser._id} /> : <span>"Please login"</span> }

    </div>
  )
}

export default withCurrentUser(UsersProfileCheckWrapper);
