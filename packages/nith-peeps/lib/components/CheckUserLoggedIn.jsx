// TODO: abstract away link tags in an object

import React, { PropTypes, Component } from 'react';
import { Components, withCurrentUser, Loading, getRenderContext, getFragment } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Helmet from 'react-helmet';
import glamorous from 'glamorous';
import {oneLine} from 'common-tags';

import { Accounts } from 'meteor/vulcan:accounts';

import Search from './Search.jsx';



const hasCompletedProfile = function hasCompletedProfile(user) {
  return Users.hasCompletedProfile(user);
}

 // const userData = apolloClient.readFragment({
 //   id: currentUserId,
 //   fragment: getFragment('UsersCurrent')
 // })

Accounts.ui.config({
   onSignedInHook: () => {
     console.log("arihantarihantarihant")
    //  // throwing Meteor setTimeout error for some reasons
    //  // saying gql is not a function
    //  // possible place of default : this very hook function
    //  let gql = require("graphql-tag");

    //  // route check should happen here;
    //  // if(hasCompleteProfile) => directory else profile complete
    //  //

    //  const currentUserId = Users.getUser()._id;
    //  const apolloClient = getRenderContext().apolloClient;

    //  console.log(`User${currentUserId}`)

    // //  let blala = apolloClient.readQuery({
    // //    query: gql`
    // //     {
    // //       currentUser {
    // //         _id
    // //         displayName
    // //       }
    // //     }
    // //    `
    // //  })

    //   let blala = apolloClient.readFragment({
    //     _id: `User${currentUserId}`,
    //     fragment: getFragment('UsersCurrent')
    //   })
    //  console.log(blala);

    /*
      Do not check and assume that the profile is not complete for now
      until sasha figures out the fragment from apolloClient.readFragment
    */
    
    
   }
})



const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const AccountsSignOutWrapper = glamorous.div({
  
});
const CheckUserLoggedIn = ({ currentUser, loading }) => {

// console.log(currentUser);


  return(
    <div className="container-to-rename-name">
      <Helmet>
        <title>Login to People of NITH</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#9aefea" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="People of NITH" />
        <meta
          name="keywords"
          content={
            oneLine`
              Welcome to the one stop
              of finding any NITHian
              ever graduated.
            `
          }
        />
        <meta name="author" content="Arihant Verma" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="canonical" href="http://peopleofnith.com/" />
        <link href="https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Love+Ya+Like+A+Sister" rel="stylesheet" />
        {
          !currentUser ? 
            <style type="text/css">{`
              body {
                background-image: url('/packages/nith-peeps/lib/static/nith.jpg');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                overflow-y: hidden;
              }
          `}</style> : ""
        }
       </Helmet>

        {loading ?

          <Loading /> :

          <div className="">
            {currentUser ?
              <div>
                <Search />
                <Components.AccountsLoginForm/>
              </div> :
                <AccountsLoginWrapper>
                {/*Rename this wrapper to AccountsLoginStylesWrapper*/}
                    <Components.AccountsLoginForm/>
                </AccountsLoginWrapper>
            }
          </div>
        }
      </div>
    )
 }





// const options = {
//   collection: Comments,
//   fragmentName: 'CommentsItemFragment',
// };

export default (withCurrentUser(CheckUserLoggedIn));
