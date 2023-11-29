import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth_service';
import { RepairService } from 'src/app/services/repair_service';
import { Repair } from 'src/app/interfaces/repair_interface';
import { RepairName } from 'src/app/interfaces/repair_name_interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RepairNameService } from 'src/app/services/repair_name_service';

@Component({
  selector: 'app-car-repair',
  templateUrl: './car-repair.component.html',
  styleUrls: ['./car-repair.component.css']
})
export class CarRepairComponent {

  modelReference!: NgbModalRef;

  id!: number;

  repairs: Repair[] = [];

  repairName: RepairName[] = [];

  @ViewChild('repairNamesSelect') repairNamesSelect!: ElementRef;
	selectedRepairName = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, 
              private modalService: NgbModal, private carRepair: RepairService, private repairNameService: RepairNameService){}

  ngOnInit(){

    this.activatedRoute.params.subscribe(params => {this.id = params['id'];});
    this.getCarAllRepair();
    this.getAllRepairName();

  }

  getAllRepairName(){
    this.repairNameService.getAllRepairName(this.authService.getToken()).subscribe(((item: RepairName[]) => this.repairName = item));
  }

  checkRepairName(id: number){

    var foundName= "";

      this.repairName.forEach( items => {
        if(items.id == id){
          foundName = items.repairName; 
        }
      })

      return foundName;

  }

  reloadPage(){
    this.getCarAllRepair();
  }

  selectRepairName(value:any){
      this.selectedRepairName = value;
  }

  getCarAllRepair(){
      this.carRepair.getAllRepairByCarId(this.id, this.authService.getToken()).subscribe(((item: Repair[]) =>this.repairs = item));
  }

  addNewRepair(price: string, date: string){

    const repair={
      "car_id": this.id,
      "repair_id": this.selectedRepairName,
      "price": price,
      "date": date
    }

    this.carRepair.createNewReapir(repair, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });
  }

  deleteRepair(id: number){
    this.carRepair.deleteRepairById(id,this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });
  }

  updateRepair(id: number, price: any, date: string){

    console.log(this.id+" id: "+ id)
    const repair={
      "id": Number(id),
      "repair_id": this.selectedRepairName,
      "car_id": Number(this.id),
      "price": String(price),
      "date": date
    }
    
    this.carRepair.updateRepair(id, repair, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

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


}
