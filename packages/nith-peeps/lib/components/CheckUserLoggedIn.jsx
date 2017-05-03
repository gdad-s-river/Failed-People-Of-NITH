// TODO: abstract away link tags in an object

import React, { PropTypes, Component } from 'react';
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core';
import Helmet from 'react-helmet';
import glamorous from 'glamorous';
import {oneLine} from 'common-tags'

const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const CheckUserLoggedIn = ({ currentUser, loading }) => {

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
      <style type="text/css">{`
          body {
            background-image: url('/packages/nith-peeps/lib/static/nith.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            overflow-y: hidden;
          }
      `}</style>
     </Helmet>

      {loading ?

        <Loading /> :

        <div className="">
          {currentUser ?
            <div>
              <span>Alright buddyy, you are already logged in</span>
              <AccountsLoginWrapper>
                  <Components.AccountsLoginForm/>
              </AccountsLoginWrapper>
            </div> :
            <AccountsLoginWrapper>
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
