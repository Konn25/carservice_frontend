import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOrderedPartsComponent } from './car-ordered-parts.component';

describe('CarOrderedPartsComponent', () => {
  let component: CarOrderedPartsComponent;
  let fixture: ComponentFixture<CarOrderedPartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarOrderedPartsComponent]
    });
    fixture = TestBed.createComponent(CarOrderedPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
