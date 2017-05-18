import Users from 'meteor/vulcan:users';

Users.addDefaultView(terms => {
  return {
    selector: {displayName: terms.query},
    options: {sort: {createdAt: -1}}
  };
});

export default Users;
