// Ported version of Facebook's warning module:
// https://github.com/BerkeleyTrue/warning/blob/master/warning.js
// --------------------------------------------
// Since we don't care about whether or not there is a condition passed
// we modified the original to account for that.

export let warning = (_format: string) => {}; // tslint:disable-line

if (process.env.NODE_ENV !== 'production') {
  const printWarning = (format: string, ...args: any[]) => {
    // @ts-ignore
    const len = arguments.length;

    args = new Array(len > 1 ? len - 1 : 0);

    for (let key = 1; key < len; key++) {
      // @ts-ignore
      args[key - 1] = arguments[key];
    }

    let argIndex = 0;

    const message =
      'Warning: ' +
      format.replace(/%s/g, () => {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message); // tslint:disable-line
    }
    try {
      throw new Error(message);
    } catch (x) {} // tslint:disable-line
  };

  warning = (format: string, ...args: any[]) => {
    // @ts-ignore
    const len = arguments.length;

    args = new Array(len > 2 ? len - 2 : 0);

    for (let key = 2; key < len; key++) {
      // @ts-ignore
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(format, ...args)` requires a warning ' + 'message argument');
    }

    // @ts-ignore
    printWarning.apply(null, [format].concat(args));
  };
}
