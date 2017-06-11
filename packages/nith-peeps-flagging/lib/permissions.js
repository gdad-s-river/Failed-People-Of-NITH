import Users from 'meteor/vulcan:users';

const membersActions = [
  "users.flagVote", 
  "users.cancelFlagVote", 
];

Users.groups.members.can(membersActions);
