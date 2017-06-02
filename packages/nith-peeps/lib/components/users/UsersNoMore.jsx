// import { registerComponent } from 'meteor/vulcan:core';
import React from "react";
import { FormattedMessage } from "meteor/vulcan:i18n";

const UsersNoMore = props => <p className="users-no-more"><FormattedMessage id="users.no_more"/></p>;

UsersNoMore.displayName = "UsersNoMore";

export default UsersNoMore;
