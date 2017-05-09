import { Components, withDocument, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import HeadTags from '../common/HeadTags.jsx';

const UsersProfile = (props) => {
  if (props.loading) {

    return <div className="page users-profile"><Components.Loading/></div>

  } else if (!props.document) {

    console.log(`// missing user (_id/slug: ${props.documentId || props.slug})`);
    return <div className="page users-profile"><FormattedMessage id="app.404"/></div> 
  
  } else {

    const user = props.document;

    const terms = {view: "userPosts", userId: user._id};
    console.log(user);
    return (
      <div className="page users-profile">
        <HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
        <h2 className="page-title">{Users.getDisplayName(user)}</h2>
        {user.htmlBio ? <div dangerouslySetInnerHTML={{__html: user.htmlBio}}></div> : null }
        <ul>
          {user.twitterUsername ? <li><a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
          {user.website ? <li><a href={user.website}>{user.website}</a></li> : null }
          <li><a href={user.linkedinId}>{user.linkedinId}</a></li>
          <li>{user.rollNoOrRegNo}</li>
          <li>{user.branch}</li>
          <li>{user.classOf}</li>
          <li>{user.levelOfDegree}</li>
          <Components.ShowIf check={Users.options.mutations.edit.check} document={user}>
            <li><Link to={Users.getEditUrl(user)}><FormattedMessage id="users.edit_account"/></Link></li>
          </Components.ShowIf>
        </ul>
        <h3><FormattedMessage id="users.posts"/></h3>
        {/*<Components.PostsList terms={terms} showHeader={false} />*/}
      </div>
    )
  }
}

UsersProfile.propTypes = {
  // document: React.PropTypes.object.isRequired,
}

// UsersProfile.displayName = "UsersProfile";

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

// registerComponent('UsersProfile', UsersProfile, withCurrentUser, [withDocument, options]);
export default withDocument(options)(withCurrentUser(UsersProfile));