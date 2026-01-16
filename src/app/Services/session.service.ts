import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
///// save data in session storage
setItem(key: string , value: any): void{

  sessionStorage.setItem(key, JSON.stringify(value))
  
  }
  
  ///// Retrive data from session storage
  
  getItem(key: string): any{
  
    const data=sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  
  
  
  
  }
  
  
  ///// Remove a spacific item from session
  
  removeitem( key : string): void {
  
  sessionStorage.removeItem(key);
  
  }
  
  /////////// Session clear all storage data
  
  clear(): void {
  
    sessionStorage.clear();
  
  }
}
