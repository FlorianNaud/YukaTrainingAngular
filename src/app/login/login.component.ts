import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage:string='' ;
  constructor(private loginService : LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(form){
    this.loginService.getJwt(form.value.username,form.value.password).subscribe(
      response =>this.handleLogin(response),
      err => this.handleLoginError(err)
    )

  }

  handleLoginError(data){
    console.log(data)
    if(data.error.code == 401){
      this.errorMessage= 'Vos identifiants ne correspondent à aucun utilisateur'
    }
    if(data.name == "HttpErrorResponse" ||data.error.code == 500 ){
      this.errorMessage= 'Veuillez réessayer plus tard'
    }
  }

  handleLogin(data){
    localStorage.setItem('token', data.token)
    this.router.navigate(['/'])

  }

}
