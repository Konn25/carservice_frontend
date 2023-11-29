import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Picture } from '../interfaces/picture_interface';

@Injectable({
    providedIn: 'root'
})

export class PictureService{

    readonly APIUrl = "http://localhost:8080/v1";
    onChange: Subject<string> = new Subject<string>();
    
    constructor(private http: HttpClient){

        window.addEventListener("storage", (storageEvent: StorageEvent) => this.onChange.next(storageEvent.key ?? ''), false );
        
    }


    getPictureById(id: number, options: any): Observable<any>{

        return this.http.get(`${this.APIUrl}/car/picture/${id}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options}), responseType: 'blob'});

    }

    deletePictureById(id:number, options:any){

        return this.http.delete(`${this.APIUrl}/car/picture/delete/${id}`,{ headers: new HttpHeaders({ "Authorization": "Bearer " + options})});

    }

    createNewPicture(id: number, picture: File, options: any){

        const formData = new FormData();
    
        formData.append('image', picture);

        return this.http.post(`${this.APIUrl}/car/picture/new/${id}`, formData,  { headers: new HttpHeaders({ "Authorization": "Bearer " + options})});
        
    }

    getCarAllPicture(carId: number, options: any){
        return this.http.get<Picture[]>(`${this.APIUrl}/car/pictures/${carId}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + options})})
    }

}