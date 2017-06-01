import escapeStringRegexp from 'escape-string-regexp';
import { addCallback, Utils } from 'meteor/vulcan:core';

function addSearchQueryParameter (parameters, terms) {

  if(!!terms.query) {
    
    const query = escapeStringRegexp(terms.query);
    // const branch = escapeStringRegexp(terms.branch);

    parameters = Utils.deepExtend(true, parameters, {
      selector: {
        $or: [
          {rollNoOrRegNo: {$regex: query, $options: 'i'}},
          {displayName: {$regex: query, $options: 'i'}},
          // note: we cannot search the body field because it's not published
          // to the client. If we did, we'd get different result sets on 
          // client and server
        ],
        // $and: [
        //   {branch: {$regex: branch, $options: 'i'}}
        // ]
      }
    });
  }
  return parameters;
}

function addBranchParameter(parameters, terms) {
    if(!!terms.branch) {
    const branch = escapeStringRegexp(terms.branch);

    parameters = Utils.deepExtend(true, parameters, {
      selector: {
        branch: {$regex: branch, $options: 'i'}
      }
    });
  }
  return parameters;
}

function addYearParameter(parameters, terms) {
  console.log(typeof terms.graduatingYear)
  if(!!terms.graduatingYear) {
    const yearString = escapeStringRegexp(terms.graduatingYear);
    const year = parseInt(yearString);
    

    parameters = Utils.deepExtend(true, parameters, {
      selector: {
        graduatingYear: year
      }
    });
  }
  return parameters;
}

addCallback("users.parameters", addBranchParameter)
addCallback("users.parameters", addYearParameter)
addCallback("users.parameters", addSearchQueryParameter);