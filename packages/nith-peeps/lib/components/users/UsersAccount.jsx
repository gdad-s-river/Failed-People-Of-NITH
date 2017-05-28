import { withCurrentUser } from 'meteor/vulcan:core';
import UsersEditForm from './UsersEditForm.jsx';
import React from 'react';
// import { FormattedMessage, intlShape } from 'react-intl';
import FlashMessages from '../common/FlashMessages.jsx';

const UsersAccount = (props, context) => {
  // note: terms is as the same as a document-shape the SmartForm edit-mode expects to receive
  const terms = props.params.slug ? {slug: props.params.slug} : props.currentUser ? {documentId: props.currentUser._id } : {};
  return (
    <div>
      <FlashMessages />
      <UsersEditForm terms={terms} />
    </div>
  )
};

UsersAccount.propTypes = {
  currentUser: React.PropTypes.object
};

UsersAccount.displayName = "UsersAccount";


export default withCurrentUser(UsersAccount);