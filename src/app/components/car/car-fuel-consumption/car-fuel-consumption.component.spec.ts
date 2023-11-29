import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarFuelConsumptionComponent } from './car-fuel-consumption.component';

describe('CarFuelConsumptionComponent', () => {
  let component: CarFuelConsumptionComponent;
  let fixture: ComponentFixture<CarFuelConsumptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarFuelConsumptionComponent]
    });
    fixture = TestBed.createComponent(CarFuelConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
