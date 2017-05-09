import AccountsCustomLoginBtn from '../components/AccountsCustomLoginBtn.jsx';
// import AccountsCustomSocialButtons from '../components/AccountsCustomSocialButtons.jsx'

import { replaceComponent, Components } from 'meteor/vulcan:core';


replaceComponent('AccountsButton', AccountsCustomLoginBtn);
// replaceComponent('AccountsSocialButtons', AccountsCustomSocialButtons);
