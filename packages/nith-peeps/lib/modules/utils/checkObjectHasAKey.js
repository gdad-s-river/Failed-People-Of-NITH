import isObject from './isObject.js';

export default function checkIfAnObjHasAtleastAKey(obj) {
  if(isObject(obj)) {
    return !!Object.keys(obj).length;
  }

  return false;
}
