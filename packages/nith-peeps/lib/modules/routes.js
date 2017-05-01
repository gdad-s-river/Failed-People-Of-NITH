import { addRoute } from 'meteor/vulcan:core';

import CheckUserLoggedIn from '../components/CheckUserLoggedIn.jsx';

addRoute({ name: 'home', path: '/', component: CheckUserLoggedIn });
