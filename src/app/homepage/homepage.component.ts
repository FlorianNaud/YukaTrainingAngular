import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../service/research.service";
import {NgForm} from "@angular/forms";
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from "../service/login.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  message = '';
  nutriscore ='';
  token;
  token2:string="";
  constructor(private researchService : ResearchService,
              private storageService : StorageService,
              private router: Router,
              private translate : TranslateService,
              private loginService: LoginService) {
            // get navigator language and apply it if it exists in translate files else it uses fr-Fr as default
              if(translate.getLangs().includes(navigator.language)){
              translate.use(navigator.language)
              }
  }

  ngOnInit(): void {
    this.checkToken()

  }

  checkToken(){
    console.log(typeof(localStorage.getItem('token')))
    if(typeof(localStorage.getItem('token')) =='string'){

      console.log(typeof(localStorage.getItem('token')))
      this.token = localStorage.getItem('token')
      if(typeof this.token == "string"){
        this.token2 = this.token
      }



      if (this.tokenExpired(this.token)) {
        localStorage.removeItem('token');
      } else {
        this.loginService.getUser(this.token).subscribe(
          data =>{
            localStorage.setItem('user', data["username"]);
          }
        )
      }
    }


  }

  search(f: NgForm){
    let brand = f.value.brand
    let category = f.value.category
    this.router.navigate(['/product_list'],{queryParams: {category: category, brand: brand, nutriscore: this.nutriscore}});

  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
