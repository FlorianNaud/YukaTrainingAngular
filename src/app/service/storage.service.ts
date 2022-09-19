import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public product: Array<any> | boolean = false;

  constructor() { }

  public getProductArray(): Array<any> | boolean {
    return this.product;
  }

  public setProductArray(product: any): void {
    this.product = product;
  }


}
