import React, { Component } from 'react';
import glamorous from 'glamorous';
import LightenDarkenColor from '../modules/utils/lighten-color.js';
import { browserHistory } from 'react-router';

// is not recursive
function makeSameKeyDiffVal(colorObj, valMutatorFunc, ...args) {
  let mutatedObj = {};
  Object.keys(colorObj).forEach((key) => {
    mutatedObj[key] = valMutatorFunc(colorObj[key], ...args);
  })
  return mutatedObj;
}

function valMutatorFunc(val, lightness) {
  return LightenDarkenColor(val, lightness)
}

const CustomLoginBtn = glamorous.button(
  {
    border: "none",
    fontFamily: `'Josefin Sans', Geneva, 'sans-serif'`,
    width: "240px",
    padding: "15px",
    color: "#fff",
    fontSize: "1.5rem",
    marginBottom: "15px",
    boxShadow: "0px 0px 15px -2px rgba(0, 0, 0, 0.75)",
    cursor: "pointer"
  },
  ({backgroundColor, hoverBackgroundColor}) => ({
    backgroundColor: backgroundColor ? backgroundColor: "white",
    ":hover" : {backgroundColor: hoverBackgroundColor }
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
      "Google": "#db4437",
      "Sign out": "#ffdb00"
    };

    const hoverBackgroundMapping = makeSameKeyDiffVal(backgroundMapping, valMutatorFunc, 20 );

    return type === 'link' ?
      <a href="#" className={ className } onClick={ onClick } style={{marginRight: '10px'}}>{ label }</a> :
      <div>
        <CustomLoginBtn
          backgroundColor={backgroundMapping[label]}
          hoverBackgroundColor={hoverBackgroundMapping[label]}
          className= {`${className}`}
          type={ type }
          disabled={ disabled }
          onClick={ onClick }>
         { label !== "Sign out" ?  `Sign in with ${label}` : label }
        </CustomLoginBtn>
      </div>
  }
}

AccountsCustomLoginBtn.propTypes = {
  onClick: React.PropTypes.func
};
