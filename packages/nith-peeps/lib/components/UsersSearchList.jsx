import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import UsersList from './users/UsersList.jsx';
import Search from './Search.jsx';
import glamorous from 'glamorous';

const UsersListWrapper =  glamorous.div({
  height: "100%"
})

const UsersSearchList = (props, context) => {
  // console.log(props.location.query);
  const terms = _.isEmpty(props.location && props.location.query) ? {}: props.location.query;
  // console.log("UsersSearchList:terms ", terms);
  if(props.currentUser) {
    return (
      <UsersListWrapper>
        <Search />
        <UsersList terms={terms}/>
      </UsersListWrapper>
    )
  } else {
    return <div>You need to sign in first</div>
  }

};

UsersSearchList.displayName = "UsersSearchList";

// registerComponent('PostsHome', PostsHome);
export default withCurrentUser(UsersSearchList);
