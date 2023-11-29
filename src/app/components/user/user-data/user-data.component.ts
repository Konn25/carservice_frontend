import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth_service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  constructor(private authService: AuthService){}
  
  get user(){
    return this.authService.user;
  }

  get email(){
    return this.user?.email;
  }


}
