import { GraphQLSchema, Utils } from "meteor/vulcan:core";
import { mutateItem } from "./flag.js";

const voteSchema = `
  type Flag {
    userId: String
    power: Float
    votedAt: String
  }

  union Votable = User
`;

GraphQLSchema.addSchema(voteSchema);

const resolverMap = {
  Votable: {
    __resolveType(obj, context, info) {
      return "User";
    },
  },
};

GraphQLSchema.addResolvers(resolverMap);
// ideally I shouldn't be passing a 'collection', it should automatically take users
// flagAction: See permissions.js:   "users.flagVote", "users.cancelFlagVote"

GraphQLSchema.addMutation(
  "flag(documentId: String, flagAction: String, collectionName: String) : Votable",
);

const flagResolver = {
  Mutation: {
    flag(root, { documentId, flagAction, collectionName }, context) {
      const collection = context[Utils.capitalize(collectionName)];
      const document = collection.findOne(documentId);
      return context.Users.canDo(
        context.currentUser,
        `${collectionName.toLowerCase()}.${flagAction}`,
      )
        ? mutateItem(
            collection,
            document,
            context.currentUser,
            flagAction,
            false,
          )
        : false;
    },
  },
};

GraphQLSchema.addResolvers(flagResolver);
