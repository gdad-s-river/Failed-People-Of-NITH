import {Accounts} from 'meteor/vulcan:accounts';
import {browserHistory} from 'react-router';

Accounts.ui.config({
  onSignedOutHook: () => {
    browserHistory.replace("/");
  }
})