import React, { PropTypes, Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { operateOnItem } from "../flag.js";

const withFlag = component => {
  return graphql(
    gql`
    mutation flag($documentId: String, $flagAction: String, $collectionName: String) {
      flag(documentId: $documentId, flagAction: $flagAction, collectionName: $collectionName) {
        ... on User {
          _id
          flagVotes
          flagVoters {
            _id
          }
        }
      }
    }
  `,
    {
      props: ({ ownProps, mutate }) => {
        return {
          flag: ({ userToFlagDoc, flagAction, currentUser }) => {
            const flagResult = operateOnItem(
              userToFlagDoc,
              currentUser,
              flagAction,
              true,
            );
            return mutate({
              variables: {
                documentId: userToFlagDoc._id,
                flagAction,
                collectionName: "users",
              },
              optimisticResponse: {
                __typename: "Mutation",
                flag: {
                  ...flagResult,
                },
              },
            });
          },
        };
      },
    },
  )(component);
};

export default withFlag;
