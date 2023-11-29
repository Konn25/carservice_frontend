import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../interfaces/user_interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    readonly APIUrl = "http://localhost:8080/v1";

    user: User | null = null;

    constructor(private http: HttpClient) {
        const email = this.getEmail();
        const token = this.getToken();

        if(email && token){
            this.loadClient(email,token);
        }

    }

    authenticate(val: any) {

        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

        return new Observable((subscribe) => {
            this.http.post(this.APIUrl + "/authenticate", val, { headers: reqHeader, responseType: 'text' })
                .subscribe({
                    next: (r) => {
                        sessionStorage.setItem('token', r);
                        sessionStorage.setItem('email', val.email);

                        this.loadClient(val.email, r);

                        subscribe.next();
                        subscribe.complete();
                    },
                    error: (e) => {
                        console.log("Something went wrong!");
                        subscribe.error(e);
                        subscribe.complete();
                    }
                });
        });
    }


    loadClient(email: any, token: any) {
        this.http.get<User>(`${this.APIUrl}/user/data/${email}`, { headers: new HttpHeaders({ "Authorization": "Bearer " + token}) })
            .subscribe({
                next: (r) => this.user = r,
                error: () => this.logout()
            });
    }


    getToken() {
        return sessionStorage.getItem('token');
    }

    getEmail() {
        return sessionStorage.getItem('email');
    }

    isLogedIn() {
        return this.getToken() !== null && this.getEmail() !== null;
    }

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
    }


}