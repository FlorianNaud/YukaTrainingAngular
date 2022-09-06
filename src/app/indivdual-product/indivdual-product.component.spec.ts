import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivdualProductComponent } from './indivdual-product.component';

describe('IndivdualProductComponent', () => {
  let component: IndivdualProductComponent;
  let fixture: ComponentFixture<IndivdualProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndivdualProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndivdualProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
