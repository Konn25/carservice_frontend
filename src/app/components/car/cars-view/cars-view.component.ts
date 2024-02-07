import { Component } from '@angular/core';
import { Car } from 'src/app/interfaces/car_interface';
import { AuthService } from 'src/app/services/auth_service';
import { CarService } from 'src/app/services/car_service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PictureService } from 'src/app/services/picture_service';
import { Picture } from 'src/app/interfaces/picture_interface';


@Component({
  selector: 'app-cars-view',
  templateUrl: './cars-view.component.html',
  styleUrls: ['./cars-view.component.css']
})

export class CarsViewComponent {

  id!: number ;

  userAllCars: Car[] = [];

  pictureList: Picture[] = [];
  pictureList2: Picture[] = [];

  allPictureGetFromDatabase: any[] = [];

  modelReference!: NgbModalRef;

  filteredPicture: any;

  constructor(private carService: CarService, private authService: AuthService, private modalService: NgbModal, private imageService: PictureService){}

  ngOnInit(){
    this.id = this.getUserId()!;
    this.getAllCar(this.getUserId());

    this.filterPictures(this.userAllCars,this.allPictureGetFromDatabase);
    console.log(this.filteredPicture)   
  }

  get user(){
    return this.authService.user;
  }

  getUserId(){
    return this.user?.id;
  }

  getAllCar(userId: any){
   return this.carService.getUserAllCarById(userId,this.authService.getToken()).subscribe( (car: Car[]) => {
      this.userAllCars = car,
      this.getSpecificCarPicture()
    });
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


  getCarImageById(car_id: number){

    return this.imageService.getCarAllPicture(car_id,this.authService.getToken()).subscribe((item: Picture[]) => 
        {
          this.pictureList = (item),
          console.log(item),
          this.getPictureBack();

          for(let i = 0; i< this.pictureList.length; i++){
            this.allPictureGetFromDatabase.push(this.pictureList[i]);
          }

          console.log(this.allPictureGetFromDatabase)

          this.allPictureGetFromDatabase.sort((a: Picture,b: Picture) => a.car.id - b.car.id )
          this.filterPictures(this.userAllCars, this.allPictureGetFromDatabase)
        }
    );
  }
  
  getSpecificCarPicture(){

    console.log("Length: " + this.userAllCars.length)

    for(let i = 0; i <= this.userAllCars.length; i++){
       this.getCarImageById(this.userAllCars[i].id);
       
    }

    
  }


  getPictureBack(){
    this.pictureList.forEach(element => {
      this.imageService.getPictureById(element.id, this.authService.getToken()).subscribe((data: any) =>{
        var imageUrl = URL.createObjectURL(data);
        element.image_data=imageUrl;
    })
    });

  }


  filterPictures(carList: Car[], picList: Picture[]){
    this.filteredPicture = new Map<string, Picture>;
    let test = this.pictureList2;

    for(let i = 0; i < this.userAllCars.length; i++){
      for(let j = 0; j< this.allPictureGetFromDatabase.length; j++){
        if(this.allPictureGetFromDatabase[j].car.id == this.userAllCars[i].id){
          test.push(this.allPictureGetFromDatabase[j]);
          this.filteredPicture.set(`${i}`,test)
        }
      }
      test = [];
    }

    console.log(this.filteredPicture);

    return this.filteredPicture;
  }

  getKeys(map: any){
    return Array.from(map.keys());
  }

  getValue(map: any){
    return Array.from(map.values())
  }

}

