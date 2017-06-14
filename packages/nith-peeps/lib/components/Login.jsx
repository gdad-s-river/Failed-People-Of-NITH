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
              background-image: url('/packages/nith-peeps/lib/static/nith.jpg');
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50% 50%;
            }

            .accounts-ui {
              padding: 50px;
              border: 4px solid #fde5c9;
              background: rgba(0,0,0,0.2);
							transform: translateY(-100px)
            }
        `}</style>
			}
		</Helmet>
	);
};

const AccountsLoginWrapper = glamorous.div({
	height: "100vh",
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
});

const StyledHeading = glamorous.h1({
	position: "absolute",
	top: "5%",
	textAlign: "center",
	right: 0,
	width: "100%",
	fontFamily: `'Barrio', cursive`,
	fontSize: "3rem",
	borderTop: "10px solid bisque",
	borderBottom: "10px solid bisque",
	color: "bisque",
	backgroundColor: "rgba(0,0,0,0.5)",
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
		<div className="slider-wrapper" style={{ width: "100%" }}>
			<nav>
				<ul className="nav">
					<li className="slide-navs">
						<a href="#before-you-login">Before You Login</a>
					</li>
					<li className="slide-navs">
						<a href="#after-you-login">
							After Loggin In
						</a>
					</li>
					<li className="slide-navs"><a href="#about">About</a></li>
					<li className="slide-navs">
						<a href="#contributing">Contributing</a>
					</li>
					<li className="slide-navs"><a href="#login">Login</a></li>
				</ul>
			</nav>
			<div className="slides" style={{ width: "100%", height: "100%" }}>

				<div className="slide slide-1" id="before-you-login">
					<div className="slide_bg" />
					<SlideDivContent1 className="slide__content">
						<Slide1H1>Welcome To People Of NITH!</Slide1H1>
						<Slide1H2>Before You Login...</Slide1H2>
						<TextCard className="text-card">
							<ParagraphStyles>
								{`As soon as you login with your Google, Facebook, Twitter Accounts,
									you'll be redirected to a `}

								<strong style={{ fontWeight: "bold" }}>complete profile</strong>

								{` link. You can't go forward anywhere on the website before filling up these
										necessary fields. Also, if you log out without filling these fields, you
										won't be searchable at
								`}

								<em style={{ fontStyle: "italics" }}>
									peopleofnith.com/search
								</em>

								{`
									. Following are the necessary fields
								`}
							</ParagraphStyles>
							<ul
								style={{
									listStyleType: "disc",
									fontFamily: `'Crimson Text', serif`,
									fontSize: "1.2rem",
									margin: "10px 0 0 0",
									lineHeight: "1.5rem",
								}}
							>
								<li>
									<StrongUnderline>
										LinkedinId:
									</StrongUnderline>{" "}
									For example
									(https://www.linkedin.com/in/arihantverma)
								</li>
								<li>
									<StrongUnderline>
										RollNo Or RegNo:
									</StrongUnderline>{" "}
									Your Roll No or Registration No (for PhD
									Scholars)
								</li>
								<li>
									<StrongUnderline>
										Graduating Year:
									</StrongUnderline>{" "}
									The year in which you have or are
									graduating
								</li>
								<li>
									<StrongUnderline>
										Branch:{" "}
									</StrongUnderline>{" "}
									Your branch of academics
								</li>
								<li>
									<StrongUnderline>
										DegreeType:
									</StrongUnderline>{" "}
									For Example: Bachelor's
								</li>
								<li>
									<StrongUnderline>
										Current Occupation:
									</StrongUnderline>{" "}
									What are you professionally doing these
									days/ Where are you studying
								</li>
								<li>
									<StrongUnderline>
										Available For Services:
									</StrongUnderline>{" "}
									Whether you are open to be contacted
									by juniors/seniors
								</li>
								<li>
									<StrongUnderline>
										Email
									</StrongUnderline>
								</li>
							</ul>
						</TextCard>
					</SlideDivContent1>
				</div>

				<div className="slide slide-2" id="after-you-login">
					<div className="slide_bg" />
					<SlideDivContent2 className="slide__content">
						<Slide1H1>Welcome To People Of NITH!</Slide1H1>
						<Slide1H2>After You Log In...</Slide1H2>
						<TextCard className="text-card">
							<ParagraphStyles>
								{`
									As soon as you've logged in and completed your profile
									you can add additional information about yourself like
									your bio, phone number, website etc. You can even change
									your existing information (that you filled during login process)
									about the necessary profile properties.
								`}
							</ParagraphStyles>
						</TextCard>
					</SlideDivContent2>
				</div>

				<div className="slide slide-3" id="about">
					<div className="slide_bg" />
					<SlideDivContent2 className="slide__content">
						<Slide1H1 media={{ margin: "auto auto 1.7em auto" }}>
							About This Website
						</Slide1H1>
						<TextCard className="text-card" flexBasis="40em">
							<ParagraphStyles>
								{`
									People of NITH is just an attempt to build a search
									index of all people who've ever graduted (or will graduate)
									from NIT Hamirpur. It's just a search index for now, but slowly
									with the help of current students of NITH (whenever that'll be)
									we intend to make more functionalities. If not anything else,
									it'll be an open source project. If you're interested in maintaining
									this project and moving it forward, please read the contribution
									section below.
								`}
							</ParagraphStyles>
						</TextCard>
					</SlideDivContent2>
				</div>

				<div className="slide slide-4" id="contributing">
					<div className="slide_bg" />
					<SlideDivContent2 className="slide__content">
						<Slide1H1 media={{ margin: "1.7rem auto 1.7em auto" }}>
							Contributing To This Project
						</Slide1H1>
						<TextCard className="text-card" flexBasis="40em">
							<ParagraphStyles fontSize="1rem">
								{`
									PeopleOfNITH.com is made using
								`}

								<a href="http://vulcanjs.org">VulcanJS </a>

								{`
									which is a set of tools around React, Apollo(GraphQL),
									and Meteor. React is a UI library made by Facebook, which
									propogates a number of things: One way data flow instead
									of two way data binding (Backbone, Angular 1, Knockout),
									componentization of whole UI, all the business logic inside
									a React Component itself (HTML in Javascript itself, no
									need for templating libraries), virtual DOM (because mutating
									HTML in the browser is very costly performance wise).
								`}

								<br />
								<br />

								{`
									GraphQL is the more fun way of doing APIs, in that it's the death
									of APIs. Instead of different API versions for any changes in
									the shape of data returned from the server, we make the request
									maker of the data, agnostic from where the data is being fetched
									and in what shape, as long as they're requesting for a valid data.
									So, instead of hitting an api end point like example.com/user/_id
									we just ask upfront what exactly we really need! Visit
								`}

								<a href="http://graphql.org/">GraphQL.org </a>

								{`
									for an example. Apollo is a set of tooling around GraphQL which
									makes it easy use it
								`}

								<br />
								<br />

								{`
									Meteor is being used as a server and a build tool. We are also
									leveraging the account system that comes in built with Meteor.
									To tell you the truth using Meteor is an overkill, but since this
									is a small web app I decided to go for it. Eventually I'd want to
									use a custom account flow, a custom graphql server, and a custom
									build process, which will be quite a bit of work, but we'll get there, together.
								`}

								<br />
								<br />

								{`
									The code for the site lives in a private Github Repository. Don't worry
									if you do not understand the above jargon, it was meant to scare you 😛.
									If you're interested in contributing and taking this project forward,
									mail me at arihantverma[at]gmail[dot]com. You don't need to know how to
									code in any of the above, you just have to have will, that's it.
								`}
							</ParagraphStyles>

						</TextCard>
					</SlideDivContent2>
				</div>

				<div className="slide slide-6" id="login">
					<div className="slide_bg" />
					<div className="slide__content">
						{/*{ currentUser ? <div> Okay Baby You are already logged in</div>: "" }*/}
						<Head />
						<StyledHeading>People of NITH</StyledHeading>
						<AccountsLoginWrapper>
							{/*Rename this wrapper to AccountsLoginStylesWrapper*/}
							<Components.AccountsLoginForm />
						</AccountsLoginWrapper>
					</div>
				</div>

			</div>
		</div>
	);
};

export default withCurrentUser(LoginScreen);
