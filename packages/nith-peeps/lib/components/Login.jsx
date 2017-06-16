import React, { PropTypes, Component } from "react";
import Users from "meteor/vulcan:users";
import { withCurrentUser, Components } from "meteor/vulcan:core";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import { gql } from "react-apollo";
import glamorous from "glamorous";
import Helmet from "react-helmet";
import { oneLine } from "common-tags";
import { Accounts } from "meteor/vulcan:accounts";
import mediaQueries from "../modules/media-queries.js";
import { browserHistory } from "react-router";

Accounts.ui.config({
	onSignedInHook: () => browserHistory.push("/search"),
	onSignedOutHook: () => browserHistory.push("/"),
});
const headingCommongStyles = {
	textAlign: "center",
};

const Slide1H1 = glamorous.h1(
	{
		fontSize: "3rem",
		transform: "translateY(0)",
		fontFamily: `'Fredericka the Great', cursive`,
		maxWidth: "60%",
		[mediaQueries.default]: {
			fontSize: "4rem",
		},
		...headingCommongStyles,
	},
	props => {
		// TODO: This is very Manual! Automate it
		let margin;
		if (props.media && props.media.margin) {
			margin = props.media.margin;
		}
		let mediaObj = {
			margin: margin || "0 auto",
			[mediaQueries.default]: {
				margin: margin,
			},
		};

		return mediaObj;
	},
);

const Slide1H2 = glamorous.h2({
	fontSize: "1.5rem",
	padding: "1rem 0",
	margin: "0 auto",
	width: "45%",
	fontFamily: `'Pacifico', cursive`,
	textAlign: "center",
	[mediaQueries.default]: {
		textAlign: "left",
	},
});

const ParagraphStyles = glamorous.p(
	{
		fontFamily: `'Crimson Text', serif`,
		fontSize: "1.2rem",
		lineHeight: "1.5rem",
		alignSelf: "center",
	},
	props => ({
		fontSize: props.fontSize ? props.fontSize : "1.2rem",
	}),
);

const contentDivStyles = {
	margin: "-2.5rem 0 0",
};

const SlideDivContent1 = glamorous.div({
	[mediaQueries.default]: {
		...contentDivStyles,
	},
});

const SlideDivContent2 = glamorous.div({
	margin: "50px 0 0",
	[mediaQueries.default]: {
		...contentDivStyles,
	},
});

const TextCard = glamorous.div(
	{
		boxShadow:
			"0 2px 2px 0 rgba(0,0,0,.14), 0 3px 14px 11px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
	},
	props => ({
		flexBasis: props.flexBasis ? props.flexBasis : "60em",
	}),
);

const Head = () => {
	return (
		<Helmet>
			<title>Login to People of NITH</title>
			<meta charSet="UTF-8" />
			<meta name="theme-color" content="#9aefea" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="People of NITH" />
			<meta
				name="keywords"
				content={oneLine`
            Welcome to the one stop
            of finding any NITHian
            ever graduated.
          `}
			/>
			<meta name="author" content="Arihant Verma" />
			<link rel="shortcut icon" type="image/png" href="/favicon.png" />
			<link rel="canonical" href="http://peopleofnith.com/" />
			<link
				href="https://fonts.googleapis.com/css?family=Barrio|Crimson+Text|Fredericka+the+Great|Pacifico"
				rel="stylesheet"
			/>
			{
				<style type="text/css">{`
            body {
              // background-image: url('/packages/nith-peeps/lib/static/nith.jpg');
              // background-size: cover;
              // background-repeat: no-repeat;
              // background-position: 50% 50%;
							background: #A3D2DF;
							// overflow-y: hidden;
							height: 100%;
            }

            .accounts-ui {
              padding: 50px;
              // border: 4px solid #fde5c9;
							box-shadow: 10px 9px 32px 0px rgba(4, 4, 4, 0.48);
              background: rgba(0,0,0,0.2);
							/* transform: translateY(-100px) */
            }
        `}</style>
			}
		</Helmet>
	);
};

const AccountsLoginWrapper = glamorous.div({
	// height: "100vh",
	width: "100%",
	height: "30%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const StyledHeading = glamorous.h1({
	// position: "absolute",
	// top: "5%",
	textAlign: "center",
	// right: 0,
	width: "100%",
	fontFamily: `'Fredericka the Great', sans-serif`,
	fontSize: "3rem",
	// borderTop: "10px solid bisque",
	// borderBottom: "10px solid bisque",
	color: "black",
	height: "40%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// transform: "translateY(100px)",
	// backgroundColor: "rgba(0,0,0,0.5)",
	[mediaQueries.default]: {
		fontSize: "5rem",
		top: 0,
	},
});

const StrongUnderline = glamorous.strong({
	fontWeight: "bold",
	textDecoration: "underline",
});

const LoginScreen = ({ currentUser, loading }) => {
	return (
		<div className="slider-wrapper" style={{ width: "100%", height: "100%" }}>
			{/*{ currentUser ? <div> Okay Baby You are already logged in</div>: "" }*/}
			<Head />
			<StyledHeading>People of NITH</StyledHeading>
			<AccountsLoginWrapper>
				{/*Rename this wrapper to AccountsLoginStylesWrapper*/}
				<Components.AccountsLoginForm />
			</AccountsLoginWrapper>
		</div>
	);
};

export default withCurrentUser(LoginScreen);
