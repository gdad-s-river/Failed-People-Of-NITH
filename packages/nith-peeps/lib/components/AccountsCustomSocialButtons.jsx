import React from 'react';
// import AccountsCustomLoginBtn from './AccountsCustomLoginBtn.jsx';
import { Components } from 'meteor/vulcan:core';


export default class AccountsCustomSocialButtons extends React.Component {
  render() {
    let { oauthServices = {}, className = "social-buttons" } = this.props;
    return(
      <div className={ className } style={{
        padding: "150px 100px",
        border: "2px solid rgb(251, 223, 223)",
        boxShadow: "0 0 5px 0px rgb(251, 223, 223)"
      }}>
        {Object.keys(oauthServices).map((id, i) => {
          return <Components.AccountsButton {...oauthServices[id]} key={i} />;
        })}
      </div>
    );
  }
}
