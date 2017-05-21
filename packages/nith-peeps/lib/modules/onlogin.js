// hacky way to get around "change password" link bug in accounts-ui
// even though there is no accounts-password meteor package enabled

// import {Accounts} from 'meteor/vulcan:accounts';
// import { Meteor } from 'meteor/meteor';

// Accounts.ui.config({
//   onSignedInHook: () => {
//     if(Meteor.isClient) {
//       setTimeout(() => {
//         document.querySelector(".accounts-ui .buttons a").remove();
//       }, 200)
      
//     }
//   }
// })