import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth_service';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  modelReference!: NgbModalRef;

  constructor(private userService: UserService ,private authService: AuthService, private modalService: NgbModal){}
  
  get user(){
    return this.authService.user;
  }

  get email(){
    return this.user?.email;
  }

  openUpdateModal(content: any){
    this.modelReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' , size:"lg"});
  }

  closeUpdateModal(){
    this.modelReference.close();
  }

  updateUpdateModal(nickName: string, name: string, email: string, password: string){
    
    const user={
      "id": this.user?.id,
      "nickName": nickName,
      "name": name,
      "email": email,
      "password": password,
    }

    this.userService.updateUser(user, this.authService.getToken()).subscribe({
      next: () => this.reloadPage(),
      error: () => this.reloadPageError()
  });
  }

  reloadPage(){
    console.log("User update success !")
    this.closeUpdateModal();
  }

  reloadPageError(){
    console.log("User update problem !")
    this.closeUpdateModal();
  }


}
