// import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const UsersLoadMore = ({loadMore, count, totalCount}) => {
  return (
    <a className="users-load-more" href="#" onClick={e => {e.preventDefault(); loadMore();}}>
      <span><FormattedMessage id="users.load_more"/></span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
  )
}

UsersLoadMore.displayName = "UsersLoadMore";

export default UsersLoadMore;
