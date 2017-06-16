// import { Components } from 'meteor/vulcan:core';
// import HeadTags from './HeadTags.jsx';
// import UsersProfileCheck from '../users/UsersProfileCheck.jsx';
// import FlashMessages from './FlashMessages.jsx';

//--------TODO: Convert it into dumb component -------------//

import React, { Component } from "react";
import { withCurrentUser } from "meteor/vulcan:core";
import gql from "graphql-tag";
import { connect } from "react-redux";
import glamorous from "glamorous";
import Users from "meteor/vulcan:users";
import { browserHistory, withRouter } from "react-router";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link } from "react-router";

import BurgerMenu from "react-burger-menu";

import withMustComplete from "../containers/withMustComplete.js";
import MustCompleteCheckRedir from "../MustCompleteCheckRedir.jsx";
// import Nav from './Nav.jsx';

import mediaQueries from "../../modules/media-queries.js";

const links = [
	// note: modal popups won't work with anything above alpha.5.
	// see https://github.com/twbs/bootstrap/issues/21876#issuecomment-276181539
	{
		rel: "stylesheet",
		type: "text/css",
		href:
			"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css",
	},
];
// import 'glamor/reset';

// const StyledNav = glamorous(Nav)({
//   position: "fixed",
//   top: 0,
//   width: "100%",
//   margin: 0,
//   right: 0,
//   left: 0,
//   zIndex: 1000
// })

const LayoutWrapper = glamorous.div(
	{
		height: "100%",
		[mediaQueries.default]: {
			// height: "100%"
		},
	},
	({ location, searchBg }) => ({
		background: location.pathname === "/search" ? searchBg : "",
	}),
);

StyledUL = glamorous.ul({
	display: "flex",
	justifyContent: "space-around",
	listStyleType: "none",
});

StyledLink = glamorous(Link)({
	color: "inherit",
	textDecoration: "none",
});

const ListStyles = glamorous.li({
	padding: "10px",
});

const HamBurgerSlider = ({ currentUser, clickHandler, isOpen, location }) => {
	const burgerStyles = {
		bmBurgerBars: {
			background: location.pathname === `/users/${currentUser.slug}/edit`
				? "#000"
				: "#fdf9e8",
		},
	};

	const Menu = BurgerMenu["bubble"];
	return (
		<Menu
			isOpen={isOpen}
			className="ham-menu"
			id={"bubble"}
			pageWrapId={"wrapper"}
			outerContainerId={"react-app"}
			styles={burgerStyles}
			left
		>
			<StyledUL>
				<ListStyles>
					<StyledLink onClick={clickHandler} to="/">Home</StyledLink>
				</ListStyles>

				<ListStyles>
					<StyledLink onClick={clickHandler} to="/complete-profile">
						Complete Profile
					</StyledLink>
				</ListStyles>

				<ListStyles>
					<StyledLink onClick={clickHandler} to="/search">Search</StyledLink>
				</ListStyles>

				<ListStyles>
					<StyledLink onClick={clickHandler} to={`/users/${currentUser.slug}`}>
						Profile
					</StyledLink>
				</ListStyles>

				<ListStyles>
					<StyledLink
						onClick={clickHandler}
						to={`/users/${currentUser.slug}/edit`}
					>
						Profile Edit
					</StyledLink>
				</ListStyles>

				<ListStyles
					onClick={() => Meteor.logout(() => window.location.reload())}
				>
					<span
						style={{
							cursor: "pointer",
							color: "#b8b7ad",
							padding: "1em",
						}}
					>
						Sign Out
					</span>
				</ListStyles>
			</StyledUL>
		</Menu>
	);
};

class CustomLayout extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isOpen: false,
		};
	}
	// constructor(props, context) {
	//   super(props, context);
	//   console.log("props contructor ", props);
	// }

	// componentDidMount() {
	//   console.log(document.querySelector(".accounts-ui .buttons"))
	// }

	closeSlider() {
		this.setState({
			isOpen: true,
		});
	}

	render() {
		const { searchBg, location, currentUser } = this.props;

		return (
			<LayoutWrapper
				className="wrapper"
				id="wrapper"
				location={location}
				searchBg={searchBg}
			>
				<Helmet link={links}>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Helmet>
				{currentUser
					? <HamBurgerSlider
							currentUser={currentUser}
							clickHandler={this.closeSlider}
							isOpen={this.state.isOpen}
							location={location}
						/>
					: null}
				{currentUser
					? <MustCompleteCheckRedir
							currentUser={currentUser}
							documentId={currentUser && currentUser._id}
						/>
					: null}

				{this.props.children}
			</LayoutWrapper>
		);
	}
}

// registerComponent('Layout', Layout, withCurrentUser);

// const mustCompleteFragment = gql`
//   fragment UsersMustCompleteFragment on User {
//     _id
//     ${Users.getRequiredFields().join('\n')}
//   }
// `
//
// const options = {
//   collection: Users,
//   queryName: 'usersMustCompleteQuery',
//   fragment: mustCompleteFragment,
// };

CustomLayout.propTypes = {
	searchBg: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ searchBg: state.searchBg });

export default withRouter(
	withCurrentUser(connect(mapStateToProps, null)(CustomLayout)),
);
