import React, { Component } from 'react';
import glamorous from 'glamorous';

const CustomLoginBtn = glamorous.button(
  {
    border: "none"
  },
  ({backgroundColor}) => ({
    backgroundColor: backgroundColor ? backgroundColor: "white"
  })
)

export default class AccountsCustomLoginBtn extends Component {
  render () {

    const {
      label,
      href = null,
      type,
      disabled = false,
      className,
      onClick
    } = this.props;

    const backgroundMapping = {
      "Twitter": "#1da1f2",
      "Facebook": "#3b5998",
      "Linkedin": "#0077b5",
      "Google": "#db4437"
    };


    return type === 'link' ?
      <a href="#" className={ className } onClick={ onClick } style={{marginRight: '10px'}}>{ label }</a> :
      <CustomLoginBtn
        backgroundColor={backgroundMapping[label]}
        className= {`${className}`}
        type={ type }
        disabled={ disabled }
        onClick={ onClick }>
        { label }
      </CustomLoginBtn>;
  }
}

AccountsCustomLoginBtn.propTypes = {
  onClick: React.PropTypes.func
};
