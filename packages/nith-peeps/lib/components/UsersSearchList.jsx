import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import UsersList from './users/UsersList.jsx';
import Search from './Search.jsx';

const UsersSearchList = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? {}: props.location.query;
  console.log("UsersSearchList:terms ", terms);
  return (
    <div>
      <Search />
      <UsersList terms={terms}/>
    </div>
  )
};

UsersSearchList.displayName = "UsersSearchList";

// registerComponent('PostsHome', PostsHome);
export default UsersSearchList;
