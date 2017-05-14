import React, { Component } from 'react';
import { getFragment } from 'meteor/vulcan:lib';
import { graphql } from 'react-apollo';   
import gql from 'graphql-tag';    

const withMustComplete = component => {

  return graphql(
    gql`
      query getCurrentUser {
        currentUserWithMustFields {
          ...UsersMustHaveFields
        }
      }
      ${getFragment('UsersMustHaveFields')}
    `, {
      alias: 'UsersMustHaveFields',
      
      props(props) {
        // console.log("from withMustComplete.js container ", props);
        const {data: {loading, currentUserWithMustFields}} = props;
        return {
          currentUserLoading: loading,
          currentUserWithMustFields,
        };
      },
    }
  )(component);
}

export default withMustComplete;
