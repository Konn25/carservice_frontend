import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  
  ngOnInit() {}

  constructor(private service: UserService ,private router: Router){}


  checkRegistration(name: string, nick: string, email: string, password: string, passwordAgain: string){

    if( name == "" || nick == "" || email == "" || password == "" || passwordAgain == ""){
      console.log("One of the field have zero value");
    }
    else{
      if(password !== passwordAgain){
        console.log('The two password are not equals');
        this.router.navigate(['register']);
      }
      else{
  
        var newUser= {
          nickName: nick,
          name: name,
          email: email,
          password: password
        }
    
        this.service.createNewUser(newUser).subscribe({
          next: () =>this.router.navigate(['login']),
          error: () => console.log('Registration problem')
        });
      }
    }
   
  }

}
