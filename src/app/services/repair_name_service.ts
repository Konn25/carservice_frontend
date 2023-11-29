import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';
import { RepairName } from '../interfaces/repair_name_interface';

@Injectable({
    providedIn: 'root'
})

export class RepairNameService{

    readonly APIUrl = "http://localhost:8080/v1";
    
    onChange: Subject<string> = new Subject<string>();
   
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }

    getAllRepairName(options: any){

        return this.http.get<RepairName[]>(`${this.APIUrl}/repair/name` , { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }


}