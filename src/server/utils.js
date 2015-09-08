
'use strict';

export function nonEmptyString(s) {
  if (!s) {
    return false;
  }
  return !/^\s*$/.exec(s);
}
