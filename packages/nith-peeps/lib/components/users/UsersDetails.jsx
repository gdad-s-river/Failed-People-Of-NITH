import React, {PropTypes} from 'react';
import HeadTags from '../common/HeadTags.jsx';
import { Components } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Bold from '../style/Bold.jsx';
import UsersAvatar from './UsersAvatar';
import {Utils} from 'meteor/vulcan:core';

import glamorous from 'glamorous';

const labelStrings = new Set([
  "Twitter Handle",
  "Facebook Profile",
  "Website",
  "Linkedin ID",
  "Roll No",
  "Branch",
  "Graduating Year",
  "Degree Type",
  "Company Or University",
  "Bio"
])


const LabelComponents = {};

const BoldSpanComponent = ({text, fontWeight}) => {
  const StyledSpan = glamorous.span({
    fontWeight: fontWeight
  })
  return (
    <StyledSpan>{text}: </StyledSpan>
  )
}

BoldSpanComponent.propTypes = {
  text: PropTypes.string.isRequired,
  fontWeight: PropTypes.string
}

for (let label of labelStrings) {
  const noSpaceLabel = label.replace(/\s/g,'');
  LabelComponents[noSpaceLabel] = () => {
    return <BoldSpanComponent text={label} fontWeight="bold" />
  }
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

    {user.htmlBio ? 
      <StyledHTMLBio dangerouslySetInnerHTML={{__html: user.htmlBio}}></StyledHTMLBio> : null }

    <ul>
      {user.twitterUsername ? 
        <li>
          <LabelComponents.TwitterHandle />
          <a href={"http://twitter.com/" + user.twitterUsername}>@{user.twitterUsername}</a>
        </li> : null }

      {user.services.fbProfileLink ? 
        <li> 
          <LabelComponents.FacebookProfile />
          <a href={user.services.fbProfileLink}>FB Profile Link</a>
        </li> : null}

      {user.website ? 
        <li>
          <LabelComponents.Website />
          <a href={user.website}>{user.website}</a>
        </li> : null }

      <li>
        <LabelComponents.LinkedinID />
        <a href={user.linkedinId}>{user.linkedinId}</a>
      </li>

      <li>
        <LabelComponents.RollNo />
        {user.rollNoOrRegNo}
      </li>

      <li>
        <LabelComponents.Branch />
        {user.branch}
      </li>

      <li>
        <LabelComponents.GraduatingYear />
        {user.classOf}
      </li>

      <li>
        <LabelComponents.DegreeType />
        {user.levelOfDegree}
      </li>

      <li>
         <LabelComponents.CompanyOrUniversity />
        {user.currentUniCompOccu}
      </li>
    </ul>
  </StyledUsersDetailsChild>
  )

}

export default UsersDetails;