import escapeStringRegexp from 'escape-string-regexp';
import { addCallback, Utils } from 'meteor/vulcan:core';

function addSearchQueryParameter (parameters, terms) {
  if(!!terms.query) {
    
    const query = escapeStringRegexp(terms.query);

    parameters = Utils.deepExtend(true, parameters, {
      selector: {
        $or: [
          {rollNoOrRegNo: {$regex: query, $options: 'i'}},
          {displayName: {$regex: query, $options: 'i'}},
          // note: we cannot search the body field because it's not published
          // to the client. If we did, we'd get different result sets on 
          // client and server
        ]
      }
    });
  }
  return parameters;
}
addCallback("users.parameters", addSearchQueryParameter);