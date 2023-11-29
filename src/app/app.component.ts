import { Component } from '@angular/core';
import { AuthService } from './services/auth_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car_frontend';

  ngOnInit(){}

  constructor(public authService: AuthService){}

}
