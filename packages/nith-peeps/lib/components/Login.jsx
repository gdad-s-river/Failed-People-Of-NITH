import React, { PropTypes, Component } from 'react';
import Users from 'meteor/vulcan:users';
import { withCurrentUser, Components } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { gql } from 'react-apollo';
import glamorous from 'glamorous';
import Helmet from 'react-helmet';
import {oneLine} from 'common-tags';
import { Accounts } from 'meteor/vulcan:accounts';
import mediaQueries from '../modules/media-queries.js';

const Head = () => {
  return (
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
      <link href="https://fonts.googleapis.com/css?family=Barrio" rel="stylesheet" />
      {
          <style type="text/css">{`
            body {
              background-image: url('/packages/nith-peeps/lib/static/nith.jpg');
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50% 50%;
              overflow-y: hidden;
            }

            .accounts-ui {
              padding: 50px;
              border: 4px solid #fde5c9;
              background: rgba(0,0,0,0.2);
            }
        `}</style>
      }
     </Helmet>
  )
}

const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const StyledHeading = glamorous.h1({
  position: "absolute",
  top: "5%",
  textAlign: "center",
  right: 0,
  width: "100%",
  fontFamily: `'Barrio', cursive`,
  fontSize: "3rem",
  borderTop: "10px solid bisque",
  borderBottom: "10px solid bisque",
  color: "bisque",
  backgroundColor: "rgba(0,0,0,0.5)",
  [mediaQueries.default]: {
    fontSize: "5rem",
    top: 0
  }

})


const LoginScreen = ({currentUser, loading}) => {
  return (
    <div className="">
        <div>
          {/*{ currentUser ? <div> Okay Baby You are already logged in</div>: "" }*/}
          <Head/>
          <StyledHeading>People of NITH</StyledHeading>
          <AccountsLoginWrapper>
          {/*Rename this wrapper to AccountsLoginStylesWrapper*/}
              <Components.AccountsLoginForm/>
          </AccountsLoginWrapper>
        </div>
    </div>
  )
}

export default withCurrentUser(LoginScreen)
