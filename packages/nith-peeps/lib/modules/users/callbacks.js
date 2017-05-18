import { addCallback, getFragment } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import gql from 'graphql-tag';
// import * as ari from 'react-router';
import {browserHistory} from 'react-router';

// console.log("Ari is ", ari)

function checkProfileOnUpdate (unusedItem, store, apolloClient) {
  // const mustCompleteFragment1 = gql`
  //   fragment UserMustCompleteFragment2 on User {
  //     _id
  //     ${Users.getRequiredFields().join("\n")}
  //   }
  // `
  // console.log("ununsed item: router cb ", unusedItem)

  const query = gql`
    query getCurrentUserWithId {
      currentUser {
        # fragment UserMustCompleteFragment2 on User {
        #   _id
        #   ${Users.getRequiredFields().join("\n")}
        # }
        _id
        ${Users.getRequiredFields().join("\n")}
      }
    }
  `
  // console.log("route entered");
  // console.log("let's see the fragment itself", getFragment('UsersCurrent'))

  const currentUser = apolloClient.readQuery({query}).currentUser;
  // console.log("router callback ", currentUser);

  // const options = {
  //   collection: Users,
  //   queryName: 'usersMustCompleteQuery1',
  //   fragment: mustCompleteFragment1
  // }



  // const currentUser = apolloClient.readQuery({query}).currentUser;


  if (currentUser && !Users.hasCompletedProfile(currentUser)) {
    if(browserHistory.getCurrentLocation().pathname !== "/complete-profile") {
      // console.log("you aren't on /complete-profile and you haven't completed your profile")
      browserHistory.push("/complete-profile");
    }
    // browserHistory.push("/complete-profile");
  }
}

addCallback('router.onUpdate', checkProfileOnUpdate);
