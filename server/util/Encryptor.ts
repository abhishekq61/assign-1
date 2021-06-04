const crypto = require('crypto');
import * as config from "config";

const ENCRYPTION_KEY = config.get("app.secret");

export class Encryptor {
  static encrypt(text: string) {

    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(text: string) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  static createHash(input: any) {
    let hash = crypto.createHash('md5').update(input).digest('hex');
    return hash;
  }


  static comparePassword(password: string, passwordHash: string): boolean {
    return this.decrypt(passwordHash) === password;
  }
}
