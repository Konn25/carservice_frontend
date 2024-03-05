import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject} from 'rxjs';
import { User } from '../interfaces/user_interface';

@Injectable({
    providedIn: 'root'
})

export class UserService{
    
    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();


    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }


    getUserDataByEmail(email: string | null, options: any){

        return this.http.get(`${this.APIUrl}/user/data/${email}`, options);

    }

    createNewUser(user: any){

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.APIUrl}/user/new`, user, {headers: reqHeader, responseType: 'text'});

    }

    updateUser(user: any, options: any){

        return this.http.post(`${this.APIUrl}/user/update`, user, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }


}