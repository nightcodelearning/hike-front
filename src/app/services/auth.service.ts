import { Injectable } from '@angular/core';
import { CognitoUserAttribute,  CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor() { }

  isAuth(): boolean{
    var isAuth = false;
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };

    var userpool = new CognitoUserPool(poolData);
    var currentUser= userpool.getCurrentUser();

    if(currentUser != null){
      currentUser.getSession((err:any,session:any) => {
        if(err){
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      });
    }
    return isAuth;


  }
}
