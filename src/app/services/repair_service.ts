import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Repair } from '../interfaces/repair_interface';

@Injectable({
    providedIn: 'root'
})

export class RepairService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }


    getAllRepairByCarId(carId: number, options: any){

        return this.http.get<Repair[]>(`${this.APIUrl}/car/repair/${carId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    createNewReapir(repair: any, options: any){
    

        return this.http.post(`${this.APIUrl}/car/repair/new`, repair,  { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
        
    }

    deleteRepairById(id: number, options: any){

        return this.http.delete(`${this.APIUrl}/car/repair/delete/${id}`,{ headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
        
    }

    updateRepair(id:number, repair: any, options: any){

        return this.http.post(`${this.APIUrl}/car/repair/update/${id}`, repair, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

}
