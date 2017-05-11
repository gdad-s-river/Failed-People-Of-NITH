import { addRoute } from 'meteor/vulcan:core';

import CheckUserLoggedIn from '../components/CheckUserLoggedIn.jsx';
import UsersProfileCheckWrapper from '../components/UsersProfileCheckWrapper.jsx';
import UsersAccount from '../components/users/UsersAccount.jsx';
import UsersSingle from '../components/users/UsersSingle.jsx';

addRoute([
  { name: 'home', path: '/', component: CheckUserLoggedIn }, 
  { name: 'complete.profile', path: "/complete-profile", component: UsersProfileCheckWrapper },
  { name:'users.edit', path:'users/:slug/edit', component: UsersAccount },
  { name:'users.single', path:'users/:slug', component: UsersSingle }
]);