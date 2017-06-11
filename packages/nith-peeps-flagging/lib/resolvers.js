import { GraphQLSchema } from "meteor/vulcan:core";

const specificResolvers = {
  User: {
    async flagVoters(user, args, { currentUser, Users }) {
      if (!user.flagVoters) return [];
      const flagVoters = await Users.loader.loadMany(user.flagVoters);
      return Users.restrictViewableFields(currentUser, Users, flagVoters);
    },
  },
};

GraphQLSchema.addResolvers(specificResolvers);
