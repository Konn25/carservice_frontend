import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OilConsumption } from 'src/app/interfaces/oil_consumption_interface';
import { AuthService } from 'src/app/services/auth_service';
import { OilConsumptionService } from 'src/app/services/oil_consumption_service';

@Component({
  selector: 'app-car-oil-consumption',
  templateUrl: './car-oil-consumption.component.html',
  styleUrls: ['./car-oil-consumption.component.css']
})
export class CarOilConsumptionComponent {

  id!: number;

  oilConsumptionList: OilConsumption[] = [];

  modelReference!: NgbModalRef;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, 
    private modalService: NgbModal, private oilConsumption: OilConsumptionService){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {this.id = params['id']});

    this.getAllOilConsumption();
  }


  goBack(): void {
    this.router.navigate(['../cars/car/data/'+this.id], { relativeTo: this.activatedRoute.parent});
  }

  openModal(content: any){
    this.modelReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
   }
 
  closeModal(){
     this.modelReference.close();
  }

  getAllOilConsumption(){
     this.oilConsumption.getAllOilConsumptionByCarId(this.id, this.authService.getToken()).subscribe((item: OilConsumption[]) => this.oilConsumptionList = item);
  }

  reloadPage(){
    this.getAllOilConsumption();
  }

  deleteOilConsumption(id: number){
    this.oilConsumption.deleteOilConsumptionById(id, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });
  }

  updateOilConsumption(id: number, oilConsumption: string, kilometer: string, date: string ){
     
    const updateOilConsumption = {
      "id":Number(id),
      "carId": Number(this.id),
      "oilConsumption": Number(oilConsumption),
      "kilometer": Number(kilometer),
      "date": date
    }

    this.oilConsumption.updateOilConsumption(updateOilConsumption, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

  }

  addOilConsumption(oilConsumption: string, kilometer: string, date: string ){
     
    const addOilConsumption = {
      "carId": Number(this.id),
      "oilConsumption": Number(oilConsumption),
      "kilometer": Number(kilometer),
      "date": date
    }

    this.oilConsumption.createNewOilConsumption(addOilConsumption, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

  }







}
