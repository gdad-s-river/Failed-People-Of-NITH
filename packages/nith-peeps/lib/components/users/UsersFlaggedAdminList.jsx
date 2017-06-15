import {
	Components,
	withList,
	withCurrentUser,
	withRemove,
	Utils,
	getFragment,
} from "meteor/vulcan:core";
import { compose } from "react-apollo";
import React from "react";
import Users from "meteor/vulcan:users";
import { Alert } from "react-bootstrap";
import { FormattedMessage, intlShape } from "meteor/vulcan:i18n";
import UsersFlaggedItem from "./UsersFlaggedItem.jsx";
import UsersLoadMore from "./UsersLoadMore.jsx";
import UsersNoMore from "./UsersNoMore.jsx";
import UsersNoResult from "./UsersNoResult.jsx";
import gql from "graphql-tag";
import LinkBare from "../common/LinkBare.jsx";
import glamorous from "glamorous";

import mediaQueries from "../../modules/media-queries.js";

const StyledUsersListContainer = glamorous.div({
	width: "auto",
	[mediaQueries.default]: {
		width: "500px",
	},
	margin: "-30px auto 0",
	position: "absolute",
	top: "50%",
	left: "38%",
	transform: "translateX(-100px)",
	// height: "100%"
});

const Error = ({ error }) =>
	<Alert className="flash-message" bsStyle="danger">
		<FormattedMessage id={error.id} values={{ value: error.value }} />
		{error.message}
	</Alert>;

const UsersList = props => {
	const {
		results,
		loading,
		count,
		totalCount,
		loadMore,
		showHeader = false,
		showLoadMore = true,
		networkStatus,
		currentUser,
		error,
		terms,
	} = props;

	const loadingMore = networkStatus === 2;

	if (results && results.length) {
		const hasMore = totalCount > results.length;

		if (!currentUser.isAdmin) {
			return (
				<span>Sorry, You Do Not Have The Permission To View This Page</span>
			);
		}

		return (
			<StyledUsersListContainer className="users-list">
				{/* {showHeader ? <Components.PostsListHeader/> : null} */}
				{error ? <Error error={Utils.decodeIntlError(error)} /> : null}
				<div className="users-list-content">
					{results.map(
						user =>
							user.flagVotes
								? <div key={user._id}>
										<LinkBare to={`users/${user.slug}`} key={user._id}>
											<UsersFlaggedItem
												user={user}
												key={user._id}
												currentUser={currentUser}
												terms={terms}
											/>
										</LinkBare>
										<span>
											<button
												onClick={() => {
													console.log(user._id);
													console.log(props.removeMutation);
													props.removeMutation({ documentId: user._id });
												}}
											>
												Remove
											</button>
										</span>

									</div>
								: null,
					)}
				</div>
				{showLoadMore
					? hasMore
						? loadingMore
							? <Components.Loading />
							: <UsersLoadMore
									loadMore={loadMore}
									count={count}
									totalCount={totalCount}
								/>
						: <UsersNoMore />
					: null}
			</StyledUsersListContainer>
		);
	} else if (loading) {
		return (
			<div className="users-list">
				{/* {showHeader ? <Components.PostsListHeader /> : null} */}
				{error ? <Error error={Utils.decodeIntlError(error)} /> : null}
				<div className="users-list-content">
					<Components.Loading />
				</div>
			</div>
		);
	} else {
		return (
			<div className="users-list">
				{/* {showHeader ? <Components.PostsListHeader /> : null} */}
				{error ? <Error error={Utils.decodeIntlError(error)} /> : null}
				<div className="users-list-content">
					<UsersNoResult />
				</div>
			</div>
		);
	}
};

UsersList.displayName = "UsersList";

UsersList.propTypes = {
	results: React.PropTypes.array,
	terms: React.PropTypes.object,
	hasMore: React.PropTypes.bool,
	loading: React.PropTypes.bool,
	count: React.PropTypes.number,
	totalCount: React.PropTypes.number,
	loadMore: React.PropTypes.func,
	// showHeader: React.PropTypes.bool,
};

UsersList.contextTypes = {
	intl: intlShape,
};

const FlagFieldsFragment = gql`
  fragment FlagFieldsFragment on User {
    _id
    ...UsersProfile
  }
  ${getFragment("UsersProfile")}
`;

const options = {
	collection: Users,
	queryName: "usersListQuery",
	fragment: FlagFieldsFragment,
	limit: 5,
};

const mutationOptions = {
	collection: Users,
};

const WrappedComponent = compose(
	withList(options),
	withRemove(mutationOptions),
	withCurrentUser,
)(UsersList);

export default WrappedComponent;
// registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
