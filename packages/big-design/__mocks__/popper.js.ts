import { default as PopperJs } from 'popper.js';

export default class Popper {
  static placements = PopperJs.placements;

  constructor() {
    return {
      // tslint:disable-next-line: no-empty
      destroy: () => {},
      // tslint:disable-next-line: no-empty
      scheduleUpdate: () => {},
    };
  }
}
