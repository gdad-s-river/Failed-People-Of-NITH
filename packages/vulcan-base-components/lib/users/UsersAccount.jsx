import { Components, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';

import glamorous from 'glamorous';

const UsersAccount = (props, context) => {
  // note: terms is as the same as a document-shape the SmartForm edit-mode expects to receive
  const terms = props.params.slug ? {slug: props.params.slug} : props.currentUser ? {documentId: props.currentUser._id } : {};
  return <Components.UsersEditForm terms={terms} />
};

UsersAccount.propTypes = {
  currentUser: React.PropTypes.object
};

UsersAccount.displayName = "UsersAccount";

const StyledUsersAccount = glamorous(UsersAccount)({
  display: "none"
})

// registerComponent('UsersAccount', UsersAccount, withCurrentUser);

export default withCurrentUser(StyledUsersAccount);
