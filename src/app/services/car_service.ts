import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';
import { Car } from '../interfaces/car_interface';

@Injectable({
    providedIn: 'root'
})

export class CarService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }


    getUserAllCarById(userId: any, options: any){
        
        return this.http.get<Car[]>(`${this.APIUrl}/car/all/${userId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    getCarById(id:number, options: any){

        return this.http.get<Car>(`${this.APIUrl}/car/${id}`, { headers: new HttpHeaders({'Content-Type': 'application/json' , "Authorization": "Bearer " + options})});

    }

    createNewCar(car: any, options: any){

        return this.http.post(`${this.APIUrl}/car/new`, car, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    updateCar(car: any, options: any){
        
        return this.http.post(`${this.APIUrl}/car/update`, car, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    deleteCarById(id:number, options: any){
        return this.http.delete(`${this.APIUrl}/car/delete/${id}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }


}