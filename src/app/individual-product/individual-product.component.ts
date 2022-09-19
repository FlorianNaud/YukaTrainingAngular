import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ResearchService} from "../service/research.service";
import {tap, timeout} from "rxjs";

export interface EnergeticValue {
  nom: string;
  position: number;
  quantité: number;
  mesure: string;
}




@Component({
  selector: 'app-individual-product',
  templateUrl: './individual-product.component.html',
  styleUrls: ['./individual-product.component.scss']
})


export class IndividualProductComponent implements OnInit {

  constructor(private r: ActivatedRoute,
              private researchService: ResearchService) {
  }

  id: string = "";
  product:any = [];
  dataSource;



  ngOnInit(): void {

    this.r
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
      });


    if (typeof this.id !== 'undefined') {
      this.researchService.getProductById(this.id)
        .pipe(timeout(10000)).subscribe({
        next: (v) => this.handleSuccess(v),
        error: () => this.handleFailure()

      })
    }}

  /**
   * on success api call
   * @param data
   */
      handleSuccess(data){
        this.product=data;
        this.dataSource = [
          {nom: 'Energie', quantite: this.product.products[0].nutriments.energy
            , mesure: this.product.products[0].nutriments.energy_unit},
          {nom: 'Protéine', quantite: this.product.products[0].nutriments.proteins, mesure: this.product.products[0].nutriments.proteins_unit
          },
          {nom: 'Gras', quantite: this.product.products[0].nutriments.fat
            , mesure: this.product.products[0].nutriments.fat_unit},
          {nom: 'Sucre', quantite: this.product.products[0].nutriments.sugars, mesure: this.product.products[0].nutriments.sugars_unit
          },
          {nom: 'Sodium', quantite: this.product.products[0].nutriments.sodium, mesure: this.product.products[0].nutriments.sodium_unit
          },
          {nom: 'Fibre', quantite: this.product.products[0].nutriments.fiber, mesure: this.product.products[0].nutriments.fiber_unit
          },
          {nom: 'Carbohydrate', quantite: this.product.products[0].nutriments.carbohydrates,
            mesure: this.product.products[0].nutriments.carbohydrates_unit},
          {nom: 'Calcium', quantite: this.product.products[0].nutriments.calcium, mesure: this.product.products[0].nutriments.calcium_unit
          },
        ];
      }

  /**
   * on failure api call
   */
  handleFailure(){
        this.product='error';
      }

  /**
   * columns displayed in nutriments array
   */
  displayedColumns: string[] = ['nom', 'quantite', 'mesure'];

}
