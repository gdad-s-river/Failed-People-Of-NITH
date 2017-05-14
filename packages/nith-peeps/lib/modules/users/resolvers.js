import { GraphQLSchema } from 'meteor/vulcan:lib';

const specificResolvers = {
  Query: {
    currentUserWithMustFields(root, args, context) {
      let user = null;
      if (context && context.userId) {
        user = context.Users.findOne(context.userId);

        // if (user.services) {
        //   Object.keys(user.services).forEach((key) => {
        //     user.services[key] = {}
        //   });
        // }
      }
      return user;
    },
  },
}

GraphQLSchema.addQuery(`currentUserWithMustFields: User`);
GraphQLSchema.addResolvers(specificResolvers);