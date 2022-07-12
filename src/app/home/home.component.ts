import { Component, OnInit } from '@angular/core';
import { CognitoUserAttribute,  CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  attributes: CognitoUserAttribute[];
  poolData = {
    UserPoolId: environment.UserPoolId, // Your user pool id here
    ClientId: environment.ClientId, // Your client id here
  };
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void{

    var userpool = new CognitoUserPool(this.poolData);
    var currentUser = userpool.getCurrentUser();
    currentUser.signOut();
    this.router.navigate(['/login']);
  }

  getAttributes():void{
    var userpool = new CognitoUserPool(this.poolData);
    var currentUser = userpool.getCurrentUser();
    currentUser.getSession((err:any,session:any) => {
      if(err){
        alert(err.message||JSON.stringify(err));
        return;
      }
    });
    currentUser.getUserAttributes((err,result)=>{
      if(err){
        alert(err.message||JSON.stringify(err));
        return;
      }
      
      this.attributes = result;  
      this.attributes.forEach((attr:CognitoUserAttribute) => console.log(attr.Name+' = '+attr.Value));

    });
    


  }

}
