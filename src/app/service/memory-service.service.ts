import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryServiceService {

  constructor() { }
  getCredential(key: string) {
    return localStorage.getItem(key)
  }
  setCredential(key: string, value: string) {
    return localStorage.setItem(key, value)
  }

  clearCredentail() {
    localStorage.clear()
  }
}
