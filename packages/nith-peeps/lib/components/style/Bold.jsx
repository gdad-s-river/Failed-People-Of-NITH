import React from 'react';
import glamorous from 'glamorous';

// component being passed has to have a "className" prop passed in argument
// https://github.com/paypal/glamorous#glamorouscomponentfactory
const Bold = (component) => {
  return glamorous(component)({
    fontWeight: "bold"
  })
}

export default Bold;