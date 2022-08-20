import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';

const date = new Date().getUTCMonth() + 1;
const routes: Routes = [
  {path:'',redirectTo:'/month/' + date,pathMatch:'full'},
  {path: 'month/:id',component: DoctorAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  test:number =5;
 }
