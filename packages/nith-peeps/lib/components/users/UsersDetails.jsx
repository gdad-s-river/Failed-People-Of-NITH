import React from 'react';
import HeadTags from '../common/HeadTags.jsx';
import { Components } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Bold from '../style/Bold.jsx';
import UsersAvatar from './UsersAvatar';

import glamorous from 'glamorous';

function getBoldedLabels() {
  const labelStrings = new Set([
    "Twitter Handle",
    "Facebook Profile",
    "Website",
    "Linkedin ID",
    "Roll No",
    "Branch",
    "Graduating Year",
    "Degree Type",
    "Company/University",
    "Bio"
  ])
}

const StyledUsersDetailsChild = glamorous.div({
  padding: "100px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  '@media(min-width: 900px)': {
    transform: "translateY(-50px)"
   }
});

const StyledHTMLBio = glamorous.div({
  maxWidth: "250px",
  width: "250px",
  '@media(min-width: 900px)': {
    maxWidth: "500px",
    width: "auto"
  }
})

const UsersDetails = ({user, currentUser}) => {
  console.log(user);
  if(!currentUser) {
    // perhaps a redirect component with a proper login message
    return <div>Please Login</div>
  }
  return (
    // TODO: proper padding place
  <StyledUsersDetailsChild className="page users-profile">
    <HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
    <h2 className="page-title">{Users.getDisplayName(user)}</h2>
    <UsersAvatar size="large" user={user} link={false}/>
    {user.htmlBio ? <StyledHTMLBio dangerouslySetInnerHTML={{__html: user.htmlBio}}></StyledHTMLBio> : null }
    <ul>
      {user.twitterUsername ? <li>Twitter Handle: <a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a></li> : null }
      {user.services.fbProfileLink ? <li> <a href={user.services.fbProfileLink}>FB Profile Link</a></li> : null}
      {user.website ? <li>Website: <a href={user.website}>{user.website}</a></li> : null }
      <li>Linkedin ID: <a href={user.linkedinId}>{user.linkedinId}</a></li>
      <li>Roll Number: {user.rollNoOrRegNo}</li>
      <li>Branch: {user.branch}</li>
      <li>Graduating Year: {user.classOf}</li>
      <li>Degree Type: {user.levelOfDegree}</li>
      <li>Company/University: {user.currentUniCompOccu}</li>
    </ul>
  </StyledUsersDetailsChild>
  )

}

export default UsersDetails;