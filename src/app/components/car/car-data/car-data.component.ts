import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth_service';
import { CarService } from 'src/app/services/car_service';
import { Car } from 'src/app/interfaces/car_interface';
import { RepairService } from 'src/app/services/repair_service';
import { RefuelService } from 'src/app/services/refuel_service';
import { Repair } from 'src/app/interfaces/repair_interface';
import { Refuel } from 'src/app/interfaces/refuel_interface';

@Component({
  selector: 'app-car-data',
  templateUrl: './car-data.component.html',
  styleUrls: ['./car-data.component.css']
})
export class CarDataComponent {
  checkCar!:Car;

  userAllCars: Car[] = [];
  id!: number;

  checked!: boolean;

  testString!: string;

	chartOptions!: any; 

  allRepairList: Repair[] = [];

  allFuelConsumptionList: Refuel[] = [];

  generatedRepairList: any[] = [];
  generatedFuelConsumptionList: any[] = [];


  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private carService: CarService,
               private repairService: RepairService, private fuelService: RefuelService){}
  

  ngOnInit(){

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("Car Id:"+`${this.id}`);
      });

      this.getAllCars();
      this.getCarsRepairs();

  }


  getAllCars(){
    this.carService.getCarById(this.id,this.authService.getToken()).subscribe(((item: Car) =>this.checkCar! = item));
  }

  getAllCarsCheck(){
    this.getAllCars();

    var i: number;

    var cars: Car[];

    cars = [];

    for(i = 0; i < this.userAllCars!.length; i++){
      cars.push(this.userAllCars![i]);
    }

    return cars;

  }

  getCarsRepairs(){
    this.repairService.getAllRepairByCarId(this.id, this.authService.getToken()).subscribe(
      (item: Repair[]) => {
        this.allRepairList = item, 
        this.getAllFuelConsumption(),
        this.generateRepair(this.allRepairList),
        this.getGraph(this.allRepairList, this.allFuelConsumptionList)
      }
    );
  }

  getAllFuelConsumption(){
      this.fuelService.getAllRefuelByCarId(this.id, this.authService.getToken()).subscribe(
        (item: Refuel[]) => {this.allFuelConsumptionList = item, 
          this.generateFuelConsumption(this.allFuelConsumptionList),
          this.getGraph(this.generatedRepairList, this.generatedFuelConsumptionList)
        })
  }

  generateFuelConsumption(fuelConsumptionList: Refuel[]){
    for(var i = 0; i< fuelConsumptionList.length; i++){
      this.generatedFuelConsumptionList.push({
          x: new Date(fuelConsumptionList[i].date),
          y: fuelConsumptionList[i].price
      })
    }

    this.generatedRepairList.sort((a,b) => {
      if(a.x>b.x){
        return 1;
      }

      if(a.x<b.x){
        return -1;
      }

      return 0;
    })

  }

  generateRepair(repairList: Repair[]){
      
      for(var i = 0; i< repairList.length; i++){
        this.generatedRepairList.push({
            x: new Date(repairList[i].date),
            y: repairList[i].price
        })
      }
      
      this.generatedRepairList.sort((a,b) => {
        if(a.x>b.x){
          return 1;
        }

        if(a.x<b.x){
          return -1;
        }

        return 0;

      })
  }

  getGraph(repairList: any, refuelList: any){

    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Fuel consumption and Repair"
      },
      axisX:{
        valueFormatString: " MMM YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Money spent",
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },  
      legend:{
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "right",
        dockInsidePlotArea: true,
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else{
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Repair",
        lineDashType: "dash",
        markerType: "square",
        xValueFormatString: "MMM YYYY",
        dataPoints: repairList
      },
      {
        type: "line",
        showInLegend: true,
        name: "Fuel consumption",
        lineDashType: "dot",
        dataPoints: refuelList
      }]
    }	
  }


}
