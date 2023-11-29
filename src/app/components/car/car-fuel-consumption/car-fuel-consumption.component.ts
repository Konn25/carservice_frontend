import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Refuel } from 'src/app/interfaces/refuel_interface';
import { AuthService } from 'src/app/services/auth_service';
import { RefuelService } from 'src/app/services/refuel_service';

@Component({
  selector: 'app-car-fuel-consumption',
  templateUrl: './car-fuel-consumption.component.html',
  styleUrls: ['./car-fuel-consumption.component.css']
})
export class CarFuelConsumptionComponent {

  modelReference!: NgbModalRef;

  id!: number;

  fuelConsumptionList: Refuel[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, 
    private modalService: NgbModal, private fuelConsumption: RefuelService){}

    ngOnInit(){

      this.activatedRoute.params.subscribe(params => {this.id = params['id']});
      
      this.getAllFuelConsumption();

    }

    getAllFuelConsumption(){
        this.fuelConsumption.getAllRefuelByCarId(this.id, this.authService.getToken()).subscribe((item: Refuel[]) => this.fuelConsumptionList = item);
    }


    reloadPage(){
      this.getAllFuelConsumption();
    }

    openModal(content: any){
      this.modelReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
     }
   
    closeModal(){
       this.modelReference.close();
    }

    goBack(): void {
      this.router.navigate(['../cars/car/data/'+this.id], { relativeTo: this.activatedRoute.parent});
    }


    deleteFuelConsumption(id: number){
      this.fuelConsumption.deleteRefuelinById(id, this.authService.getToken()).subscribe({
        next: () => this.reloadPage(),
        error: () => this.reloadPage()
      });
    }

    updateFuelConsumption(id: number, price: string, fuel_quantity: any, kilometer: string, date: string ){
     
      const updateFuelConsumption = {
        "id":Number(id),
        "car_id": Number(this.id),
        "price": Number(price),
        "fuelQuantity": Number(fuel_quantity),
        "kilometer": Number(kilometer),
        "date": date
      }

      this.fuelConsumption.updateRefueling(id,updateFuelConsumption, this.authService.getToken()).subscribe({
        next: () => this.reloadPage(),
        error: () => this.reloadPage()
      });

    }

    addNewFuelConsumption(price: string, fuel_quantity: any, kilometer: string, date: string ){

      const newFuelConsumption = {
        "car_id": this.id,
        "price": Number(price),
        "fuelQuantity": Number(fuel_quantity),
        "kilometer": Number(kilometer),
        "date": date
      }

      this.fuelConsumption.createNewRefueling(newFuelConsumption, this.authService.getToken()).subscribe({
        next: () => this.reloadPage(),
        error: () => this.reloadPage()
      });

    }

}
