import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

    secretKey = "good4amobile";
    constructor() { }

    encrypt(value : string) : string{
      return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }

    decrypt(textToDecrypt : string){
      return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }
}
