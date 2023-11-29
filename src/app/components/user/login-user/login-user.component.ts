import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth_service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  @Input()
  public sessionStorage = sessionStorage;

  ngOnInit() {}

  constructor(private authService: AuthService, private router: Router){}

  loginUser(email: string, password: string){

    var userLogin = {
      email: email,
      password: password
    }

    this.authService.authenticate(userLogin).subscribe({
      next: () => this.router.navigate(['details']),
      error: () => console.log('Authentication problem')
    })

  }

}
