import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Refuel } from '../interfaces/refuel_interface';

@Injectable({
    providedIn: 'root'
})

export class RefuelService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }


    getAllRefuelByCarId(carId: number, options: any){

        return this.http.get<Refuel[]>(`${this.APIUrl}/car/refuel/${carId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    createNewRefueling(refuel: any, options: any){

        return this.http.post(`${this.APIUrl}/car/refuel/new`, refuel, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
        
    }

    updateRefueling(id: number, refuel: any, options: any){

        return this.http.post(`${this.APIUrl}/car/refuel/update/${id}`, refuel, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    deleteRefuelinById(id: number, options: any){
       
        return this.http.delete(`${this.APIUrl}/car/refuel/delete/${id}`,{ headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

}