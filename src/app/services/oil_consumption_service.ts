import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OilConsumption } from '../interfaces/oil_consumption_interface';

@Injectable({
    providedIn: 'root'
})

export class OilConsumptionService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }

    getAllOilConsumptionByCarId(carId: number, options: any){
        return this.http.get<OilConsumption[]>(`${this.APIUrl}/oil/consumption/${carId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    createNewOilConsumption(oilconsumption: any, options: any){
        return this.http.post(`${this.APIUrl}/oil/consumption/new`, oilconsumption, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    updateOilConsumption(oilconsumption: any, options: any){
        return this.http.post(`${this.APIUrl}/oil/consumption/new`, oilconsumption, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    deleteOilConsumptionById(id: number, options: any){
        return this.http.delete(`${this.APIUrl}/oil/consumption/delete/${id}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

}