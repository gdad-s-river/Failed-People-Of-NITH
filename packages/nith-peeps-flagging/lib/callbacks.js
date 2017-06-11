import { addCallback, runCallbacksAsync, Utils } from "meteor/vulcan:core";
import Users from "meteor/vulcan:users";
import { operateOnItem, flagVotePower } from "./flag.js";

/**
 * @summary Update the profile of the user doing the operation
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateUser(item, user, collection, operation, context) {
  // uncomment for debug
  // console.log(item);
  // console.log(user);
  // console.log(collection._name);
  // console.log(operation);

  const update = {};
  const flatVote = {
    userId: item._id,
    votedAt: new Date(),
    power: flagVotePower,
  };

  const collectionName = Utils.capitalize(collection._name);

  switch (operation) {
    case "flagVote":
      update.$addToSet = { [`flagVoted${collectionName}`]: flatVote };
      break;
    case "cancelFlagVote":
      update.$pull = { [`flagVoted${collectionName}`]: { itemId: item._id } };
      break;
  }

  Users.update({ _id: user._id }, update);
}

addCallback("flagVote.async", updateUser);
addCallback("cancelFlagVote.async", updateUser);

/**
 * @summary Run the "flagVote.async" callbacks *once* the item exists in the database
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 */
function UpvoteAsyncCallbacksAfterDocumentInsert(item, user, collection) {
  runCallbacksAsync("flagVote.async", item, user, collection, "flagVote");
}

// ARI: not sure if I should do this
addCallback("users.new.async", UpvoteAsyncCallbacksAfterDocumentInsert);
// addCallback("comments.new.async", UpvoteAsyncCallbacksAfterDocumentInsert);
