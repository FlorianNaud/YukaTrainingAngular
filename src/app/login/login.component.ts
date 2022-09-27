import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngForm = this.fb.group({
    username: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
      updateOn: 'blur'
    }],
    password: [
      '',
      [Validators.required, Validators.minLength(4),
        // createPasswordStrengthValidator()
      ]
    ]
  });

  errorMessage:string='' ;

  constructor(private loginService : LoginService,
              private router: Router,
            private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get username() {
    return this.ngForm.controls['username'];
  }

  get password() {
    return this.ngForm.controls['password'];
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
    if(data.status == 0 ||data.error.code == 500 ){
      this.errorMessage= 'Veuillez réessayer plus tard'
    }
  }

  handleLogin(data){
    localStorage.setItem('token', data.token)
    this.router.navigate(['/'])

  }


}
