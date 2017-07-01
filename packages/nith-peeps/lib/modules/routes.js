import { addRoute } from 'meteor/vulcan:core';

import LoginScreen from '../components/Login.jsx';
import UsersProfileCheckWrapper from '../components/UsersProfileCheckWrapper.jsx';
import UsersAccount from '../components/users/UsersAccount.jsx';
import UsersSingle from '../components/users/UsersSingle.jsx';
import Search from '../components/Search.jsx';
import UsersSearchList from '../components/UsersSearchList.jsx'
import UsersFlaggedAdminList from '../components/users/UsersFlaggedAdminList.jsx';

addRoute([
  { name: 'home', path: '/', component: LoginScreen },
  { name: 'complete.profile', path: "/complete-profile", component: UsersProfileCheckWrapper },
  { name:'users.edit', path:'users/:slug/edit', component: UsersAccount },
  { name:'users.single', path:'users/:slug', component: UsersSingle },
  { name:'users.search', path:'/search', component: UsersSearchList },
  {name: 'users.flagged', path: "/flagged", component: UsersFlaggedAdminList}
]);
