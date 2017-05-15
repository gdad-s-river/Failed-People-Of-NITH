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
import Redirect from './Redirect.jsx';


const AccountsLoginWrapper = glamorous.div({
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

class MustCompleteCheckRedir extends Component {
  // constructor() {
  //   super();
  //   // this.state = {
  //   //   fieldsToFill: false
  //   // }
  // }

  componentDidMount() {

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
    // console.log("mustcompletecheckredir:render:requiredfields: ", Users.getRequiredFields().join("\n"));
        const userMustCompleteFields = this.props.document;

        console.log("mustcompletecheckredir:userMustCompleteFields(document) are ", userMustCompleteFields);
        if(!this.props.currentUser || this.props.loading) {
          return <div>current user or loading</div>;
        } else {
            // return fields that are required by the schema but haven't been filled out yet
            const fieldsToComplete = _.filter(Users.getRequiredFields(), fieldName => {
              return !userMustCompleteFields[fieldName]
            })

            if(fieldsToComplete.length) {
              if (userMustCompleteFields) {
                return <Redirect route="/complete-profile"/>
              } else {
                return <Redirect route="/search" />
              }
            } else {
              return null
            }
        }
  };
}

MustCompleteCheckRedir.propTypes = {
  currentUser: PropTypes.object
}

MustCompleteCheckRedir.contextTypes = {
  intl: intlShape
};

// MustCompleteCheckRedir.displayName = "MustCompleteCheckRedir";

const mustCompleteFragment1 = gql`
  fragment UserMustCompleteFragment1 on User {
    _id
    ${Users.getRequiredFields().join("\n")}
  }
`

const options = {
  collection: Users,
  queryName: 'usersMustCompleteQuery1',
  fragment: mustCompleteFragment1
}


// registerComponent('UsersProfileCheck', UsersProfileCheck, withMessages, [withDocument, options]);
// export default UsersProfileCheck;

export default withDocument(options)(withMessages(MustCompleteCheckRedir))
