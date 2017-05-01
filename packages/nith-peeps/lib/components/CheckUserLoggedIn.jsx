import React, { PropTypes, Component } from 'react';
import { Components, withCurrentUser, Loading } from 'meteor/vulcan:core';
import Helmet from 'react-helmet';
import glamorous from 'glamorous';


const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const CheckUserLoggedIn = ({ currentUser, loading }) => {

return(
    <div className="comments-list">
    <Helmet title="Sign In: People of NITH" />
      {loading ?

        <Loading /> :

        <div className="">
          {currentUser ?
            <div>
              <span>Alright buddyy, you are already logged in</span>
                  <Components.AccountsLoginForm/>
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
