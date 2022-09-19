import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../service/research.service";
import {StorageService} from "../service/storage.service";
import {ActivatedRoute, Router} from '@angular/router';
import {tap, timeout} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  constructor(private researchService: ResearchService,
              private storageService: StorageService,
              private r: ActivatedRoute,
              private router: Router
              ) {
  }

  brand:string = "";
  category:string = "";
  nutriscore:string = "";
  productList:any = [];
  length:number = 1000;
  pageSize:number = 10;
  optionSizeArray = [5,10,25,50,100];
  pageEvent;

  ngOnInit(): void {
    console.log(this.productList)

    this.r.queryParams
    .subscribe(params => {
      this.brand = params['brand'];
      this.category = params['category'];
      this.nutriscore = params['nutriscore'];
      console.log(params)
    });





  this.researchService.getListProduct(this.category,this.brand, this.nutriscore )
.pipe(timeout(20000)).subscribe({
       next: (v) => this.handleSuccess(v),
      error: (e) => this.handleFailure()

})
}

  /**
   *  on success api call
   * @param data
   */
  handleSuccess(data){
    this.productList=data;
    this.length=this.productList.count
  }

  /**
   * on failure api call
   */
  handleFailure(){
    this.productList='error';
  }

  /**
   *
   * @param id
   */
  checkProduct(id:number){
    this.router.navigate(['/individual-product'],{queryParams: {id: id}});
  }


  /**
   * paginator event
   * @param event
   */
  handlePage(event){
    this.productList = "";
    this.researchService.getListProduct(this.category,this.brand, this.nutriscore, event.pageIndex+1  , event.pageSize )
      .pipe(tap(data => {
      })).subscribe((data)=>{
      this.productList = data;
      this.length=this.productList.count
    })
  }
}
