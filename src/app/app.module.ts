import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { Routes,RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { LoginUserComponent } from './components/user/login-user/login-user.component';
import { UserDataComponent } from './components/user/user-data/user-data.component';
import { AuthGuard } from './auth_guard/auth.guard';
import { AuthService } from './services/auth_service';
import { CarsViewComponent } from './components/car/cars-view/cars-view.component';
import { CarDataComponent } from './components/car/car-data/car-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarRepairComponent } from './components/car/car-repair/car-repair.component';
import { CarFuelConsumptionComponent } from './components/car/car-fuel-consumption/car-fuel-consumption.component';
import { CarPictureComponent } from './components/car/car-picture/car-picture.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
const routes: Routes = [

  {path:'login', component:LoginUserComponent},
  {path:'register', component:RegisterUserComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'details', component:UserDataComponent, canActivate:[AuthGuard]},
  {path:'cars', component:CarsViewComponent, canActivate:[AuthGuard]},
  {path: 'cars/car/data/:id', component:CarDataComponent, canActivate:[AuthGuard]},
  {path: 'cars/car/data/:id/repairs', component: CarRepairComponent, canActivate:[AuthGuard]},
  {path: 'cars/car/data/:id/fuelconsumption', component: CarFuelConsumptionComponent, canActivate:[AuthGuard]},
  {path: 'cars/car/data/:id/picture', component: CarPictureComponent, canActivate:[AuthGuard]},
  {path: 'admin/users', component: ListUserComponent, canActivate:[AuthGuard]},


];


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    UserDataComponent,
    CarsViewComponent,
    CarDataComponent,
    CarRepairComponent,
    CarFuelConsumptionComponent,
    CarPictureComponent,
    ListUserComponent
  ],
  imports: [
    CanvasJSAngularChartsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFTOKEN',
    }),
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule,
  ],
  providers: [AuthService, AuthGuard, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
