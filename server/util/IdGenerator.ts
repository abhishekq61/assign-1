let nanoid = require('nanoid/generate');

export class IdGenerator {
  static getUniqueId() {
    return nanoid('123456789ABCDEFGHIJKLMNPQRSTUVWXYZ', 24);
  }
}
