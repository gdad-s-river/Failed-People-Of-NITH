import React, { PropTypes, Component } from "react";
import Users from "meteor/vulcan:users";
import {
	withDocument,
	Components,
	registerComponent,
	withMessages,
} from "meteor/vulcan:core";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import { gql } from "react-apollo";
import mediaQueries from "../../modules/media-queries.js";
import glamorous from "glamorous";
import { Helmet } from "react-helmet";

MainStyles = glamorous.main({
	margin: "5em 2em",
	[mediaQueries.default]: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		width: "90%",
	},
	margin: "3em 2em",
});

const UsersProfileCheck = (
	{ currentUser, document, loading, flash },
	context,
) => {
	// we're loading all fields marked as "mustComplete" using withDocument
	const userMustCompleteFields = document;

	// console.log(userMustCompleteFields)
	// console.log(currentUser);

	// if user is not logged in, or userMustCompleteFields is still loading, don't return anything
	if (!currentUser || loading) {
		// console.log("what the!")
		return null;
	} else {
		// return fields that are required by the schema but haven't been filled out yet
		const fieldsToComplete = _.filter(Users.getRequiredFields(), fieldName => {
			return !userMustCompleteFields[fieldName];
		});

		if (fieldsToComplete.length) {
			// console.log("usersprofilecheck: render: ", userMustCompleteFields);
			return (
				<MainStyles>
					<Helmet title="Edit Profile">
						<style type="text/css">
							{`
              .bm-burger-bars {
                background: #000!important;
              }
            `}
						</style>
					</Helmet>
					<FormattedMessage id="users.complete_profile" />
					<Components.SmartForm
						collection={Users}
						documentId={currentUser._id}
						fields={fieldsToComplete}
						successCallback={user => {
							console.log("you've successfully inserted the required fields!");
							const newUser = { ...currentUser, ...user };
							if (Users.hasCompletedProfile(newUser)) {
								flash(
									context.intl.formatMessage({ id: "users.profile_completed" }),
									"success",
								);
							}
						}}
					/>
					<FormattedMessage id="app.or" />
					<div
						style={{
							padding: "15px",
						}}
					>
						<a
							className="complete-profile-logout"
							style={{
								padding: "10px",
								background: "#5f5c5c",
								color: "white",
								cursor: "pointer",
							}}
							onClick={() =>
								Meteor.logout(
									() =>
										window.location.reload() /* something is broken here when giving the apollo client as a prop*/,
								)}
						>
							<FormattedMessage id="users.log_out" />
						</a>
					</div>

				</MainStyles>
			);
		} else {
			return null;
		}
	}
};

UsersProfileCheck.propTypes = {
	currentUser: PropTypes.object,
};

UsersProfileCheck.contextTypes = {
	intl: intlShape,
};

UsersProfileCheck.displayName = "UsersProfileCheck";

const mustCompleteFragment = gql`
  fragment UserMustCompleteFragment on User {
    _id
    ${Users.getRequiredFields().join("\n")}
  }
`;

const options = {
	collection: Users,
	queryName: "usersMustCompleteQuery",
	fragment: mustCompleteFragment,
};

// registerComponent('UsersProfileCheck', UsersProfileCheck, withMessages, [withDocument, options]);
// export default UsersProfileCheck;

export default withDocument(options)(withMessages(UsersProfileCheck));
