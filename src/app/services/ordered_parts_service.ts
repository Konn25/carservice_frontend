import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { OrderedParts } from '../interfaces/ordered_parts_interface';

@Injectable({
    providedIn: 'root'
})


export class OrderedPartsService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }

    getAllOrderedPartsByCarId(carId: number, options: any){
        return this.http.get<OrderedParts[]>(`${this.APIUrl}/order/part/car/${carId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    createNewOrderedPart(orderedPart: any, options: any){
        return this.http.post(`${this.APIUrl}/order/part/new`, orderedPart,{ headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    updateNewOrderedPart(orderedPart: any, options: any){
        return this.http.post(`${this.APIUrl}/order/part/new`, orderedPart,{ headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

    deleteOrderedPartById(id: number, options: any){
        return this.http.delete(`${this.APIUrl}/order/part/delete/${id}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
    }

}