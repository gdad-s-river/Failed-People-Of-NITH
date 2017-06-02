// import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from "meteor/vulcan:i18n";

const UsersNoResults = props => <p className="users-no-results"><FormattedMessage id="users.no_results"/></p>;

UsersNoResults.displayName = "UsersNoResults";

export default UsersNoResults;
