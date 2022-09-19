import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../service/research.service";
import {NgForm} from "@angular/forms";
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  message = '';
  nutriscore ='';
  constructor(private researchService : ResearchService,
              private storageService : StorageService,
              private router: Router,
              private translate : TranslateService) {
            // get navigator language and apply it if it exists in translate files else it uses fr-Fr as default
              if(translate.getLangs().includes(navigator.language)){
              translate.use(navigator.language)
              }
  }

  ngOnInit(): void {
  }


  search(f: NgForm){
    let brand = f.value.brand
    let category = f.value.category
    this.router.navigate(['/product_list'],{queryParams: {category: category, brand: brand, nutriscore: this.nutriscore}});

  }

}
