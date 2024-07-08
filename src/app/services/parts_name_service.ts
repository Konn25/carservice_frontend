import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PartsName } from '../interfaces/parts_name_interface';

@Injectable({
    providedIn: 'root'
})

export class PartsNameService{

    readonly APIUrl = "http://localhost:8080/v1";

    onChange: Subject<string> = new Subject<string>();

 constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }

    getAllPartsName(options: any){

        return this.http.get<PartsName[]>(`${this.APIUrl}/parts/name` , { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }


}