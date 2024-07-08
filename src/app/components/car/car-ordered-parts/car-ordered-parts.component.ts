import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrderedParts } from 'src/app/interfaces/ordered_parts_interface';
import { PartsName } from 'src/app/interfaces/parts_name_interface';
import { AuthService } from 'src/app/services/auth_service';
import { OrderedPartsService } from 'src/app/services/ordered_parts_service';
import { PartsNameService } from 'src/app/services/parts_name_service';

@Component({
  selector: 'app-car-ordered-parts',
  templateUrl: './car-ordered-parts.component.html',
  styleUrls: ['./car-ordered-parts.component.css']
})
export class CarOrderedPartsComponent {

  id!: number;

  modelReference!: NgbModalRef;

  orderedPartsList: OrderedParts[] = [];

  partNameList: PartsName[] = [];

  @ViewChild('partNamesSelect') partNamesSelect!: ElementRef;
	selectedPartName = '';



  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, 
    private modalService: NgbModal, private orderedParts: OrderedPartsService, private partsName: PartsNameService){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.getAllPartsName();
    this.getAllOrderedParts();
  }

  reloadPage(){
    this.getAllOrderedParts();
  }

  selectPartName(value:any){
    this.selectedPartName = value;
  }

  getPictureURLById(selectedValue: any){
      var foundURL = "";

    this.partNameList.forEach( items => {
      if(items.id == Number(selectedValue)){
        foundURL = items.pictureURL; 
      }
    })    
    return foundURL;
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

  getAllOrderedParts(){
      this.orderedParts.getAllOrderedPartsByCarId(this.id,this.authService.getToken()).subscribe((item: OrderedParts[]) => this.orderedPartsList = item);
  }

  deleteOrderedPart(id: number){
    this.orderedParts.deleteOrderedPartById(id, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });
  }

  addNewOrderedPart(companyName: string, manufacturerName: string,  date: string, price: string){

    const newOrderedPart ={
      "carId":  Number(this.id),
      "companyName": companyName,
      "manufacturerName": manufacturerName,
      "partNameId":  this.selectedPartName,
      "carPartPictureName": this.getPictureURLById(this.selectedPartName),
      "date": date,
      "price":  Number(price),
    }

    this.orderedParts.createNewOrderedPart(newOrderedPart, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

  }

  updateOrderedPart(id: number, companyName: string, manufacturerName: string, date: string, price: string){

    const updateOrderedPart ={
      "id": id,
      "carId":  Number(this.id),
      "companyName": companyName,
      "manufacturerName": manufacturerName,
      "partNameId": this.selectedPartName,
      "carPartPictureName":  this.getPictureURLById(this.selectedPartName),
      "date": date,
      "price":  Number(price),
    }

    this.orderedParts.updateNewOrderedPart(updateOrderedPart, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPage()
    });

  }

  getAllPartsName(){
    this.partsName.getAllPartsName(this.authService.getToken()).subscribe(((item: PartsName[]) => this.partNameList = item));
  }

  checkPartsName(id: number){

    var foundName= "";

      this.partNameList.forEach( items => {
        if(items.id == id){
          foundName = items.name; 
        }
      })

      return foundName;

  }


}
