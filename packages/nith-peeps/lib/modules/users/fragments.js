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
    linkedinId
    branch
    classOf
    rollNoOrRegNo
    levelOfDegree
  }
`);

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    bio
    htmlBio
    twitterUsername
    website
    groups
    phone
    # karma
    # vulcan:posts
    # postCount
    # vulcan:comments
    # commentCount
    # vulcan:voting
  }
`);