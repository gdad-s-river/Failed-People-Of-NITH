import React from 'react';
import UsersProfile from './UsersProfile';
// import { registerComponent } from 'meteor/vulcan:core'

const UsersSingle = (props, context) => {
  // console.log("usersingle:props ", props);
  return <UsersProfile userId={props.params._id} slug={props.params.slug} />
};

UsersSingle.displayName = "UsersSingle";

// registerComponent('UsersSingle', UsersSingle);
export default UsersSingle;
