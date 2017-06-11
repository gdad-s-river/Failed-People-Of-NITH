import Users from "meteor/vulcan:users";
import { hasFlagged } from "./helpers.js";
import { runCallbacks, runCallbacksAsync } from "meteor/vulcan:core";
import update from "immutability-helper";

export const flagVotePower = 1;

// ARI: not used anywhere ¯\_(ツ)_/¯

const keepFlagVoteProperties = item =>
  _.pick(item, "__typename", "_id", "flagVoters", "flagVotes");

export const operateOnItem = (
  originalItem,
  user,
  flagAction,
  isClient = false,
) => {
  user = typeof user === "undefined" ? Meteor.user() : user;

  let item = {
    flagVotes: 0,
    flagVoters: [],
    ...originalItem,
  };

  console.log("originalItem ", originalItem);

  const hasFlaggedTheUser = hasFlagged(user, item);
  console.log("hasFlaggedTheUser ? ", hasFlaggedTheUser);
  const collectionName = "users";
  const canDo = Users.canDo(user, `${collectionName}.${flagAction}`);

  if (
    !item ||
    !user ||
    !canDo ||
    (flagAction === "flagVote" && hasFlaggedTheUser) ||
    (flagAction === "cancelFlagVote" && !hasFlaggedTheUser)
  ) {
    // console.log("What is happening");
    throw new Error(
      `Can't Perform Operation "${collectionName}.${flagAction}"`,
    );
  }

  // haven't checked changes for this syntax yet
  item = runCallbacks(flagAction, item, user, flagAction, isClient);

  /*
  Copied this from vulcan:voting's vote.js
    voters arrays have different structures on client and server:

    - client: [{__typename: "User", _id: 'foo123'}]
    - server: ['foo123']
  */

  const flagVoter = isClient ? { __typename: "User", _id: user._id } : user._id;
  const filterFunction = isClient
    ? u => u._id !== user._id
    : u => u !== user._id;

  switch (flagAction) {
    case "flagVote":
      item = update(item, {
        flagVoters: { $push: [flagVoter] },
        flagVotes: { $set: item.flagVotes + 1 },
      });

      break;

    case "cancelFlagVote":
      item = update(item, {
        flagVoters: { $set: item.flagVoters.filter(filterFunction) },
        flagVotes: { $set: item.flagVotes - 1 },
      });

      break;
  }
  return item;
};

/*
Call operateOnItem, update the db with the result, run callbacks.
*/

// ideally I shouldn't be passing a 'collection', it should automatically take users

export const mutateItem = function(collection, originalItem, user, flagAction) {
  const newItem = operateOnItem(originalItem, user, flagAction, false);
  // newItem.inactive = false;

  collection.update({ _id: newItem._id }, newItem, { bypassCollection2: true });

  // --------------------- Server-Side Async Callbacks --------------------- //
  runCallbacksAsync(
    flagAction + ".async",
    newItem,
    user,
    collection,
    flagAction,
  );

  return newItem;
};
