import { Components, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import { STATES } from 'meteor/vulcan:accounts';
import glamorous from 'glamorous';
import Helmet from 'react-helmet';
import mediaQueries from '../../modules/media-queries.js'

const links = [
  // note: modal popups won't work with anything above alpha.5. 
  // see https://github.com/twbs/bootstrap/issues/21876#issuecomment-276181539
  {
    rel: 'stylesheet',
    type: 'text/css',
    href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css'
  }
];

const StyledUsersEditForm = glamorous.div({
  textAlign: "center",
  position: "relative",
  top: "72px",
  width: "60%",
  left: "86px",

  [mediaQueries.default]: {
    width: "80%",
    left: "100px",
  }
})

const StyledH2 = glamorous.h2({
  padding: "0 0 20px 0",
  fontSize: "2rem"
})

const UsersEditForm = (props, context) => {
  return (
    <div>
      <Helmet title="Edit Profile" link={links} >
        <style type="text/css">
        {`
          .bm-burger-bars {
            background: "#000"
          }
        `}
        </style>
      </Helmet>
      <Components.ShowIf
      check={Users.options.mutations.edit.check}
      document={props.terms.documentId ? {_id: props.terms.documentId} : {slug: props.terms.slug}}
      failureComponent={<FormattedMessage id="app.noPermission"/>}
    >
      <StyledUsersEditForm className="page users-edit-form">
        <StyledH2 className="page-title users-edit-form-title">
          <FormattedMessage id="users.edit_account"/>
        </StyledH2>

        <Components.SmartForm 
          collection={Users} 
          {...props.terms}
          successCallback={user => {
            props.flash(context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
          }}
        />
      </StyledUsersEditForm>
    </Components.ShowIf>
    </div>
  );
};


UsersEditForm.propTypes = {
  terms: React.PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  intl: intlShape
};

// UsersEditForm.displayName = "UsersEditForm";

// registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
export default withMessages(withCurrentUser(UsersEditForm));