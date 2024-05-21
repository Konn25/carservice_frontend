import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user_interface';
import { AuthService } from 'src/app/services/auth_service';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {

  userList: User[] = [];

  ngOnInit(){
    this.getAllUsers();
  }

  constructor( public userService: UserService, private authService: AuthService ){}


  getAllUsers(){
    return this.userService.getAllUser(this.authService.getToken()).subscribe((user: any) =>{
        this.userList = user;
    } );
  }

  deleteUserById(pictureId: number){
    this.userService.deleteUserById(pictureId, this.authService.getToken()).subscribe({
      next: () => this.getAllUsers(),
      error: () => this.getAllUsers()
    });
  }




}
