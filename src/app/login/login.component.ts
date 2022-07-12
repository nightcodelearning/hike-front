import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void{

    //datos del pool
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };

    var userpool = new CognitoUserPool(poolData);
    
    //datos del user
    var userData={
      Username: this.email,
      Pool: userpool

    }

    var cognitoUser = new CognitoUser(userData);

    //credenciales
    var authData = {
      Username: this.email,
      Password: this.password
    }

    var authDetails = new AuthenticationDetails(authData);

    //login

    cognitoUser.authenticateUser(authDetails,{
      onSuccess:(result) =>{
        console.log('Token ('+ result.getAccessToken().getJwtToken()+")");
        this.router.navigate(['/home'])

      }, onFailure(err) {
          alert(err.message||JSON.stringify(err));
      }
    });









    

  }

}
