import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {IndividualProductComponent} from "./individual-product/individual-product.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'product_list', component: ProductListComponent },
  { path: 'individual-product', component: IndividualProductComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
