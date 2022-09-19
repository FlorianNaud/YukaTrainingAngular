import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import {timeout} from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  apiUrl= 'https://fr.openfoodfacts.org/cgi/search.pl';

  constructor(private httpClient: HttpClient) {
  }


  /**
   * get all product from the API with different parameters
   * @param category
   * @param brands
   * @param nutriscore
   * @param page
   * @param page_size
   */
  getListProduct(category:string='',brands:string = '',  nutriscore:string='', page:number =1, page_size:number=10){
    const params = new HttpParams()
      .set('brands_tags', brands)
      .set('categories_tags', category)
      .set('action', "process")
      .set('json', '1')
      .set('page_size', '50')
      .set('tagtype_0','nutrition_grades')
      .set('tag_contains_0','contains')
      .set('tag_0', nutriscore)
      .set('page', page)
      .set('page_size',page_size)

    return this.httpClient.get(this.apiUrl, { params })
      .pipe(data => {
        return data

      });
  }

  /**
   * get one product from the API with an id
   * @param id
   */
  getProductById(id: string): any {

    const params = new HttpParams()
      .set('code', id  )
      .set('action', "process")
      .set('json', '1')

    return this.httpClient.get(this.apiUrl, { params })
      .pipe(data => {
        return data
      });


  }

}
