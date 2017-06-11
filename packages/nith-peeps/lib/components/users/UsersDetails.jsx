import React, { PropTypes } from "react";
import HeadTags from "../common/HeadTags.jsx";
import { Components } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import { Link } from "react-router";
import { FormattedMessage } from "meteor/vulcan:i18n";
import Bold from "../style/Bold.jsx";
import UsersAvatar from "./UsersAvatar";
import { Utils } from "meteor/vulcan:core";

import glamorous from "glamorous";
import Helmet from "react-helmet";

import UsersFlag from "./UsersFlag.jsx";
import mediaQueries from "../../modules/media-queries.js";

const labelStrings = new Set([
	"Twitter Handle",
	"Facebook Profile",
	"Website",
	"Linkedin ID",
	"Roll No Or Reg No",
	"Branch",
	"Graduating Year",
	"Degree Type",
	"Current Occupation",
	"Bio",
	"Email",
	"Phone No",
	"Available For Services",
]);

const LabelComponents = {};

const BoldSpanComponent = ({ text, fontWeight }) => {
	const StyledSpan = glamorous.span({
		fontWeight: fontWeight,
	});
	return <StyledSpan>{text}: </StyledSpan>;
};

BoldSpanComponent.propTypes = {
	text: PropTypes.string.isRequired,
	fontWeight: PropTypes.string,
};

for (let label of labelStrings) {
	const noSpaceLabel = label.replace(/\s/g, "");
	LabelComponents[noSpaceLabel] = () => {
		return <BoldSpanComponent text={label} fontWeight="bold" />;
	};
}

const StyledUsersDetailsChild = glamorous.div({
	padding: "100px",
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	[mediaQueries.default]: {
		transform: "translateY(-20px)",
	},
});

const StyledHTMLBio = glamorous.div({
	maxWidth: "250px",
	width: "250px",
	textAlign: "justify",
	padding: "0 0 25px",
	lineHeight: "1.5rem",
	[mediaQueries.default]: {
		maxWidth: "500px",
		width: "auto",
	},
});

const StyledUsernameHeading = glamorous.h2({
	fontSize: "1.5rem",
	padding: "20px",
	textAlign: "center",
	width: "100vw",
});

const StyledUserListItem = glamorous.li({
	padding: "0 0 5px",
	margin: "0 0 5px",
});

function camelCasedLabel(str) {
	let stringsWithoutSpaces = str.replace(/\s/g, "");
	let lowerCasedString =
		stringsWithoutSpaces.charAt(0).toLowerCase() +
		stringsWithoutSpaces.slice(1);
	return lowerCasedString;
}

const UsersDetails = ({ user, currentUser }) => {
	// console.log(user, currentUser);
	/*
    CHALLENGE && TODO: prevent manual entries of list
  // */
	// console.log(user);
	// const userKeys = Object.keys(user);

	// function f(signature) {
	//   for (let label of labelStrings) {
	//     if(userKeys.indexOf(camelCasedLabel(label))) {
	//       console.log(`
	//         <li>
	//           ${user[camelCasedLabel(label)]}
	//         </li>
	//       `)
	//     }
	//   }
	// }

	if (!currentUser) {
		// perhaps a redirect component with a proper login message
		return <div>Please Login</div>;
	}
	return (
		// TODO: proper padding place
		<StyledUsersDetailsChild className="page users-profile">
			<Helmet>
				<style type="text/css">
					{`
        body {
          background: linear-gradient(to right, #52cbd9, #c0ffae)
        }
        `}
				</style>
			</Helmet>
			<HeadTags
				url={Users.getProfileUrl(user, true)}
				title={Users.getDisplayName(user)}
			/>
			<UsersAvatar size="XL" user={user} link={false} />
			<StyledUsernameHeading className="page-title">
				{Users.getDisplayName(user)}
			</StyledUsernameHeading>

			{user.htmlBio
				? <StyledHTMLBio dangerouslySetInnerHTML={{ __html: user.htmlBio }} />
				: null}

			<div className="user-details-wrapper">
				<ul>
					{user.twitterUsername
						? <StyledUserListItem>
								<LabelComponents.TwitterHandle />
								{/* TODO: Abstract away a link with target and rel noopener into a separate component*/}
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={"http://twitter.com/" + user.twitterUsername}
								>
									@{user.twitterUsername}
								</a>
							</StyledUserListItem>
						: null}

					{user.services.fbProfileLink
						? <StyledUserListItem>
								<LabelComponents.FacebookProfile />
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={user.services.fbProfileLink}
								>
									FB Profile Link
								</a>
							</StyledUserListItem>
						: null}

					{user.website
						? <StyledUserListItem>
								<LabelComponents.Website />
								<a href={user.website}>{user.website}</a>
							</StyledUserListItem>
						: null}

					<StyledUserListItem>
						<LabelComponents.LinkedinID />
						<a href={user.linkedinId}>{user.linkedinId}</a>
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.RollNoOrRegNo />
						{user.rollNoOrRegNo}
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.Branch />
						{user.branch}
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.GraduatingYear />
						{user.graduatingYear}
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.DegreeType />
						{user.degreeType}
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.CurrentOccupation />
						{user.currentOccupation}
					</StyledUserListItem>

					<StyledUserListItem>
						<LabelComponents.Email />
						{user.email}
					</StyledUserListItem>

					{user.phone
						? <StyledUserListItem>
								<LabelComponents.PhoneNo />
								{user.phone}
							</StyledUserListItem>
						: null}

					{user.availableForServices
						? <StyledUserListItem>
								<LabelComponents.AvailableForServices />
								{user.availableForServices.toString()}
							</StyledUserListItem>
						: null}
				</ul>
				{user._id === currentUser._id || user.isAdmin
					? null
					: <UsersFlag
							userToFlagDoc={user}
							flagAction="flagVote"
							currentUser={currentUser}
						/>}
			</div>
		</StyledUsersDetailsChild>
	);
};

export default UsersDetails;
