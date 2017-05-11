import { Components } from 'meteor/vulcan:core';
import HeadTags from './HeadTags.jsx';
import UsersProfileCheck from '../users/UsersProfileCheck.jsx';

import React, { PropTypes, Component } from 'react';

const CustomLayout = props =>
  <div className="wrapper" id="wrapper">

    <h1>Ae Oh Header</h1>
    <HeadTags />

    {/*<UsersProfileCheck currentUser={props.currentUser} documentId={props.currentUser && props.currentUser._id} />*/}

    {/*<Components.Header />*/}
  
    <div className="main">

      {/*<Components.FlashMessages />*/}

      {/*<Components.Newsletter />*/}

      {props.children}

    </div>
  
    {/*<Components.Footer />*/}
  
  </div>

// registerComponent('Layout', Layout, withCurrentUser);

export default CustomLayout;