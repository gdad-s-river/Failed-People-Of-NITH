import AccountsCustomLoginBtn from '../components/AccountsCustomLoginBtn.jsx';
import CustomLayout from '../components/common/CustomLayout.jsx';
// import AccountsCustomSocialButtons from '../components/AccountsCustomSocialButtons.jsx'

import { replaceComponent, Components } from 'meteor/vulcan:core';


replaceComponent('AccountsButton', AccountsCustomLoginBtn);
replaceComponent('Layout', CustomLayout);
// replaceComponent('AccountsSocialButtons', AccountsCustomSocialButtons);
