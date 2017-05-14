import React, {Component} from 'react';
import Users from 'meteor/vulcan:users';
import { browserHistory } from 'react-router';
import gql from 'graphql-tag';
import withMustComplete from './containers/withMustComplete.js';

class Search extends Component {

  // componentDidMount() {
  //   // console.log("Search Component Did Mount ", this.props);
  //   const {currentUserWithMustFields} = this.props;
  //
  //   console.log("componentDidMount: search: currentUserWithMustFields ", this.props);
  //
  //   if (!!currentUserWithMustFields && !Users.hasCompletedProfile(currentUserWithMustFields)) {
  //     browserHistory.push("/complete-profile");
  //     // console.log("Not completed bro");
  //   } else {
  //     // browserHistory.push("/");
  //     // console.log("oh yeah it's completed");
  //     // browserHistory.push("/");
  //   }
  // }

  render() {
    // console.log("render: search: currentUserWithMustFields", this.props);
    return (
      <div>Search Component</div>
    )
  }

}

const mustCompleteFragment = gql`
  fragment UsersMustCompleteFragment1 on User {
    _id
    ${Users.getRequiredFields().join('\n')}
  }
`

const options = {
  collection: Users,
  queryName: 'usersMustCompleteQuery',
  fragment: mustCompleteFragment,
};

export default withMustComplete(Search);
