import { Components, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import Users from 'meteor/vulcan:users';
// import { Link } from 'react-router';
import UsersDetails from './UsersDetails.jsx'

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;
    // console.log("userprofile:userdoc: ", user);

    return (
      <UsersDetails user={user} currentUser={props.currentUser} />
     )
  }
}

UsersProfile.propTypes = {
  // document: React.PropTypes.object.isRequired,
}

// UsersProfile.displayName = "UsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

// registerComponent('UsersProfile', UsersProfile, withCurrentUser, [withDocument, options]);
export default withDocument(options)(withCurrentUser(UsersProfile));