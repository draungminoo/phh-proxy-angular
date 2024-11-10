import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoJsService {
  randomHexString(length: number) {
    return CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
  }
}
