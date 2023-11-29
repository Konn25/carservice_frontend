import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPictureComponent } from './car-picture.component';

describe('CarPictureComponent', () => {
  let component: CarPictureComponent;
  let fixture: ComponentFixture<CarPictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarPictureComponent]
    });
    fixture = TestBed.createComponent(CarPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
