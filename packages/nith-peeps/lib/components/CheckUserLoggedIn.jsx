// TODO: abstract away link tags in an object

import React, { PropTypes, Component } from 'react';
import { Components, withCurrentUser, withDocument, Loading, getRenderContext, getFragment } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Helmet from 'react-helmet';
import glamorous from 'glamorous';
import {oneLine} from 'common-tags';

import { Accounts } from 'meteor/vulcan:accounts';

import Search from './Search.jsx';
import gql from 'graphql-tag';


const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const AccountsSignOutWrapper = glamorous.div({
  
});

const CheckUserLoggedIn = ({ currentUser, loading, document, ...props }) => {
  // console.log("currentUser ", currentUser);
  console.log("document ", document);
  console.log("props are ", props);

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


// CheckUserLoggedIn.propTypes = {
//   currentUser: PropTypes.object
// }

// CheckUserLoggedIn.contextTypes = {
//   intl: intlShape
// };

// const mustCompleteFragment = gql`
//   fragment UserMustCompleteFragment on User {
//     _id
//     ${Users.getRequiredFields().join("\n")}
//   }
// `

const options = {
  collection: Users,
  queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};


/*
  experimenting
*/

const CheckUserLoggedInWithDoc = withDocument(options)(CheckUserLoggedIn);

const LetsWrapThis = props =>
  <div className="lets-wrap-this">
    <CheckUserLoggedInWithDoc currentUser={props.currentUser} documentId={props.currentUser && props.currentUser._id} />
  </div>


export default withCurrentUser(LetsWrapThis);


