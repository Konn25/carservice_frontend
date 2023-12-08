import { Component } from '@angular/core';
import { Car } from 'src/app/interfaces/car_interface';
import { AuthService } from 'src/app/services/auth_service';
import { CarService } from 'src/app/services/car_service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cars-view',
  templateUrl: './cars-view.component.html',
  styleUrls: ['./cars-view.component.css']
})
export class CarsViewComponent {

  userAllCars: Car[] = [];

  modelReference!: NgbModalRef;

  constructor(private carService: CarService, private authService: AuthService, private modalService: NgbModal){}

  ngOnInit(){
    this.getAllCar(this.getUserId());
  }

  get user(){
    return this.authService.user;
  }

  getUserId(){
    return this.user?.id;
  }

  getAllCar(userId: any){
   return this.carService.getUserAllCarById(userId,this.authService.getToken()).subscribe((car: Car[]) => this.userAllCars = car);
  }

  showAllCar(){
    var i: number;
    var cars: Car[];

    cars = [];

    for(i = 0; i < this.userAllCars!.length; i++){
      cars.push(this.userAllCars![i]);
    }
    return cars;
  }

  openUpdateModal(content: any){
   this.modelReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' , size:"lg"});
  }

  closeUpdateModal(){
    this.modelReference.close();
  }

  reloadPage(){
    console.log("Car update problem !")
    this.getAllCar(this.getUserId());
    this.showAllCar();
  }


  updateUpdateModal(carId: number,manufacturer:string, carType: string, engine: string, fuel: string, kilometer: string, year: string, price: string){
    
    const car={
      "id": carId,
      "user_id": this.getUserId(),
      "manufacturer": manufacturer,
      "type": carType,
      "motor": Number(engine),
      "fuel": fuel,
      "kilometer": Number(kilometer),
      "year": Number(year),
      "price": Number(price)
    }

    this.carService.updateCar(car, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
  });
  }


  deleteCar(carId: number){
      this.carService.deleteCarById(carId, this.authService.getToken()).subscribe({
          next: () => this.reloadPage(),
          error: () => this.reloadPage()
      });
  }

  addNewCar(manufacturer:string, carType: string, engine: string, fuel: string, kilometer: string, year: string, price: string){
    const car={
      "user_id": this.getUserId(),
      "manufacturer": manufacturer,
      "type": carType,
      "motor": Number(engine),
      "fuel": fuel,
      "kilometer": Number(kilometer),
      "year": Number(year),
      "price": Number(price)
    }

    this.carService.createNewCar(car,this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

  }


}
