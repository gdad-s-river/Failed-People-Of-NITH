import React, { PropTypes, Component } from 'react';
import Users from 'meteor/vulcan:users';
import { withDocument, Components, registerComponent, withMessages } from 'meteor/vulcan:core';
import { FormattedMessage, intlShape } from 'react-intl';
import { gql } from 'react-apollo';
import { browserHistory } from 'react-router';
import glamorous from 'glamorous';
import Helmet from 'react-helmet';
import {oneLine} from 'common-tags';
import equal from 'deep-equal';
// import { Accounts } from 'meteor/vulcan:accounts';
//
// Accounts.ui.config({
//   onSignedInHook: () => {
//     browserHistory.replace("/search");
//   },
//   onSignedOutHook: () => {
//
//   }
// });


const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

class CheckUserLoggedIn extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   fieldsToFill: false
  //   // }
  // }

  componentDidMount() {
    console.log("componentDidMount fired");
    console.log("componentDidMount:checkuser: ", this.props);
    const userMustCompleteFields = this.props.document;
    if(!this.props.currentUser || this.props.loading) {
      console.log("no user or loading");
      // return <div>current user or loading</div>;
    } else {
        // return fields that are required by the schema but haven't been filled out yet
        const fieldsToComplete = _.filter(Users.getRequiredFields(), fieldName => {
          return !userMustCompleteFields[fieldName]
        })

        if(fieldsToComplete.length) {
          // this.setState({
          //   fieldsToComplete: true
          // })
          browserHistory.push("/complete-profile")
        } else {
          return null
        }
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("previous props ", this.props);
  //   console.log("nextProps ", nextProps);
  //
  //   if(!equal(this.props.currentUser, nextProps.currentUser)) {
  //     console.log("not same");
  //     const userMustCompleteFields = nextProps.document;
  //     if(!nextProps.currentUser) {
  //       console.log("no user or loading");
  //       // return <div>current user or loading</div>;
  //     } else {
  //       console.log("yes user and not loading")
  //         // return fields that are required by the schema but haven't been filled out yet
  //         const fieldsToComplete = _.filter(Users.getRequiredFields(), fieldName => {
  //           return !userMustCompleteFields[fieldName]
  //         })
  //
  //         console.log(fieldsToComplete.length);
  //
  //         if(fieldsToComplete.length) {
  //           // this.setState({
  //           //   fieldsToComplete: true
  //           // })
  //           console.log("you haven't completed everything baby");
  //           browserHistory.push("/complete-profile");
  //         } else {
  //           console.log("user profile complete");
  //         }
  //     }
  //   } else {
  //     console.log("same")
  //     return false;
  //   }
  // }

  // shouldComponentUpdate(nextProps){
  //   return false;
  // }

  render() {
    // console.log("render fired")
    return <div></div>
  };
}

CheckUserLoggedIn.propTypes = {
  currentUser: PropTypes.object
}

CheckUserLoggedIn.contextTypes = {
  intl: intlShape
};

CheckUserLoggedIn.displayName = "CheckUserLoggedIn";

const mustCompleteFragment = gql`
  fragment UserMustCompleteFragment1 on User {
    _id
    ${Users.getRequiredFields().join("\n")}
  }
`

const options = {
  collection: Users,
  queryName: 'usersMustCompleteQuery',
  fragment: mustCompleteFragment
}


// registerComponent('UsersProfileCheck', UsersProfileCheck, withMessages, [withDocument, options]);
// export default UsersProfileCheck;

export default withDocument(options)(withMessages(CheckUserLoggedIn))
