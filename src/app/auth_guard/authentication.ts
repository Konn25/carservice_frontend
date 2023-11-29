import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Authentication {
  isloggedin = false;
  
  constructor() { }

isAuthenticated(){
  const token = sessionStorage.getItem('token');
  if(token?.length != null){
    this.isloggedin = true;
  }
  
  return this.isloggedin;
  }

}
