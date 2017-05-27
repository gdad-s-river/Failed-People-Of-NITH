import { Components, withList, withCurrentUser, Utils, getFragment } from 'meteor/vulcan:core';
import React from 'react';
import Users from 'meteor/vulcan:users';
import { Alert } from 'react-bootstrap';
import { FormattedMessage, intlShape } from 'react-intl';
import UsersItem from "./UsersItem.jsx";
import UsersLoadMore from "./UsersLoadMore.jsx";
import UsersNoMore from "./UsersNoMore.jsx";
import UsersNoResult from "./UsersNoResult.jsx";
import gql from 'graphql-tag';
import LinkBare from '../common/LinkBare.jsx';
import glamorous from 'glamorous';

import mediaQueries from '../../modules/media-queries.js';

const StyledUsersListContainer = glamorous.div({
  width: "auto",
  [mediaQueries.default]: {
    width: "500px"
  },
  margin: "0 auto",
  // height: "100%"
})

const Error = ({error}) => <Alert className="flash-message" bsStyle="danger"><FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}</Alert>

const UsersList = (props) => {

  const {results, loading, count, totalCount, loadMore, showHeader = false, showLoadMore = true, networkStatus, currentUser, error, terms} = props;

  const loadingMore = networkStatus === 2;

  if (results && results.length) {

    const hasMore = totalCount > results.length;

    return (
      <StyledUsersListContainer className="users-list" >
        {/* {showHeader ? <Components.PostsListHeader/> : null} */}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="users-list-content">
          {
            results.map(user => 
              <LinkBare to={`users/${user.slug}`} key={user._id} >
                <UsersItem user={user} key={user._id} currentUser={currentUser} terms={terms} />
              </LinkBare> 
            )
          }
        </div>
        {showLoadMore ? hasMore ? (loadingMore ? <Components.Loading/> : <UsersLoadMore loadMore={loadMore} count={count} totalCount={totalCount} />) : <UsersNoMore/> : null}
      </StyledUsersListContainer>
    )
  } else if (loading) {
    return (
      <div className="users-list">
        {/* {showHeader ? <Components.PostsListHeader /> : null} */}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="users-list-content">
          <Components.Loading/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="users-list">
        {/* {showHeader ? <Components.PostsListHeader /> : null} */}
        {error ? <Error error={Utils.decodeIntlError(error)} /> : null }
        <div className="users-list-content">
          <UsersNoResult/>
        </div>
      </div>
    )
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
  intl: intlShape
};

const mustCompleteFragment = gql`
  fragment UserMustCompleteFragment2 on User {
    _id
    ...UsersProfile
  }
  ${getFragment('UsersProfile')}
`

const options = {
  collection: Users,
  queryName: 'usersListQuery',
  fragment: mustCompleteFragment,
  limit: 5
};

export default withList(options)(withCurrentUser(UsersList))
// registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
