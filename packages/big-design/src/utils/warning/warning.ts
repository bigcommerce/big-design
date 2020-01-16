import { isProduction } from '../env';

// Ported from tiny-warning:
// https://github.com/alexreardon/tiny-warning/blob/master/src/index.js
// --------------------------------------------
// Since we don't care about whether or not there is a condition passed
// we modified the original to account for that.

export const warning = (message: string): void => {
  // don't do anything in production
  // wrapping in production check for better dead code elimination
  if (!isProduction) {
    // Condition not passed
    const text: string = `Warning: ${message}`;

    // check console for IE9 support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      console.warn(text); // tslint:disable-line no-console
    }

    // Throwing an error and catching it immediately
    // to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(text);
    } catch (x) {} // tslint:disable-line no-empty
  }
};
