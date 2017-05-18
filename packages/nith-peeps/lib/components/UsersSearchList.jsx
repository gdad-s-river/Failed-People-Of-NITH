import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import UsersList from './users/UsersList.jsx';
import Search from './Search.jsx';

const UsersSearchList = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {}: props.location.query;
  console.log("UsersSearchList:terms ", terms);
  if(props.currentUser) {
    return (
      <div>
        <Search />
        <UsersList terms={terms}/>
      </div>
    )
  } else {
    return <div>You need to sign in first</div>
  }

};

UsersSearchList.displayName = "UsersSearchList";

// registerComponent('PostsHome', PostsHome);
export default withCurrentUser(UsersSearchList);
