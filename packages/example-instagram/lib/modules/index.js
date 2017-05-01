import { replaceComponent, removeCallback, Utils } from 'meteor/vulcan:core';
import './pics/collection.js';
import './comments/collection.js';

// removeCallback("user.new.sync", "setupUser");

import Layout from '../components/common/Layout.jsx';
replaceComponent('Layout', Layout);

Utils.icons.comment = 'comment';

import './routes.js';
