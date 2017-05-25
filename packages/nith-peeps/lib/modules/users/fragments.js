import { registerFragment, getFragment } from 'meteor/vulcan:core';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
// registerFragment(`
//   fragment VotedItem on Vote {
//     # vulcan:voting
//     itemId
//     power
//     votedAt
//   }
// `);

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    username
    displayName
    emailHash
  }
`);


registerFragment(`
  fragment UsersMustHaveFields on User {
    _id
    linkedinId
    branch
    graduatingYear
    rollNoOrRegNo
    degreeType
    email
    availableForServices
  }
`)

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    ...UsersMustHaveFields
    createdAt
    isAdmin
    bio
    htmlBio
    twitterUsername
    website
    groups
    phone
    currentOccupation
    avatarUrl
    services
    # karma
    # vulcan:posts
    # postCount
    # vulcan:comments
    # commentCount
    # vulcan:voting
  }
`);
