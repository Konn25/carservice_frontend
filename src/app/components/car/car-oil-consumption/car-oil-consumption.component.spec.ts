import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOilConsumptionComponent } from './car-oil-consumption.component';

describe('CarOilConsumptionComponent', () => {
  let component: CarOilConsumptionComponent;
  let fixture: ComponentFixture<CarOilConsumptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarOilConsumptionComponent]
    });
    fixture = TestBed.createComponent(CarOilConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
