import React, { PropTypes, Component } from 'react';
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core';

import Comments from '../../modules/comments/collection.js';
import CommentsItem from './CommentsItem.jsx';

const CheckUserLoggedIn = ({ currentUser }) =>

  <div className="comments-list">

    {loading ?

      <Loading /> :

      <div className="">
        {currentUser ? <div>User Logged In</div> ? <div>You are not logged in</div>}
      </div>

    }

  </div>

const options = {
  collection: Comments,
  fragmentName: 'CommentsItemFragment',
};

export default (withCurrentUser(ServicesLogin));
