import { GraphQLSchema } from "meteor/vulcan:lib";
import { Utils } from "meteor/vulcan:lib";

function getPublicServicesData(user) {
  if (typeof user !== "undefined") {
    if (Utils.checkNested(user, "services", "facebook")) {
      return {
        facebook: {
          link: user.services.facebook.link,
        },
      };
    } else if (Utils.checkNested(user, "services", "google")) {
      return {
        google: {
          picture: user.services.google.picture,
        },
      };
    } else if (Utils.checkNested(user, "services", "twitter")) {
      return {
        twitter: {},
      };
    }
  }
}

const specificResolvers = {
  User: {
    services: (user, args, context) => {
      return getPublicServicesData(context.Users.findOne(user._id));
    },
  },
};

// GraphQLSchema.addQuery(`currentUserWithMustFields: User`);
GraphQLSchema.addResolvers(specificResolvers);
