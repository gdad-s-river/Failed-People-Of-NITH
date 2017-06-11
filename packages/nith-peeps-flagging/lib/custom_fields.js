import SimpleSchema from "simpl-schema";

import Users from "meteor/vulcan:users";

const flagSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  power: {
    type: Number,
    optional: true,
  },
  flaggedAt: {
    type: Date,
    optional: true,
  },
});

// also being repeated in nith-peeps
// put it in Utils

function addUserFields(fieldSchemaMapping) {
  for (let key in fieldSchemaMapping) {
    if (fieldSchemaMapping.hasOwnProperty(key)) {
      Users.addField({
        fieldName: `${key}`,
        fieldSchema: fieldSchemaMapping[key],
      });
    }
  }
}

let fieldSchemaMapping = {
  // on me, people who I've flagged
  /*
    like this:
    "upvotedPosts" : [
    {
      "itemId" : "y9JQL5sontiMn8uum", // instead of itemId, userId
      "votedAt" : ISODate("2017-06-08T05:42:03.934Z"),
      "power" : 1
    },
  ]
  */
  flagVotedUsers: {
    type: Array,
    optional: true,
    viewableBy: ["members"],
    resolveAs: "flaggedUsers: [Flag]",
  },

  "flaggedUsers.$": {
    type: flagSchema,
    optional: true,
  },

  // on me, number of people who have flagged me
  flagVotes: {
    type: Number,
    optional: true,
    defaultValue: 0,
    viewableBy: ["members"],
  },

  // on me, array of people ids who have flagged me
  /**
    An array containing the `_id`s of the user's (mine) flaggers/flagVoters
  */
  flagVoters: {
    type: Array,
    optional: true,
    viewableBy: ["members"],
    resolveAs: "flagVoters: [User]",
  },

  "flagVoters.$": {
    type: String,
    optional: true,
  },
};

addUserFields(fieldSchemaMapping);
