import { addCallback, getFragment } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import gql from 'graphql-tag';
import { browserHistory } from 'react-router';

function checkProfileOnUpdate (unusedItem, store, apolloClient) {
  const query = gql`
    query getCurrentUserMustFillFields {
      currentUserWithMustFields {
        _id
        ${Users.getRequiredFields().join('\n')}
      }
    }
  `

  const currentUser = apolloClient.readQuery({query});
  // console.log(currentUser);

  console.log("Updating a route");
  if (!Users.hasCompletedProfile(currentUser.currentUserWithMustFields)) {
    console.log(`Walla! Not completed`)
    debugger;
    browserHistory.push("/complete-profile");
  } else {
    console.log("completed")
  }
}

// addCallback('router.onUpdate', checkProfileOnUpdate);

// const mustCompleteFragment = gql`
//   fragment UsersMustCompleteFragment on User {
//     _id
//     ${Users.getRequiredFields().join('\n')}
//   }
// `
