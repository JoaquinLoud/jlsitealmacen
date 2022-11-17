import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosCompradosComponent } from './productos-comprados.component';

describe('ProductosCompradosComponent', () => {
  let component: ProductosCompradosComponent;
  let fixture: ComponentFixture<ProductosCompradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosCompradosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosCompradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
