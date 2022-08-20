import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogFormComponent } from './doctor-appointment/dialog-form/dialog-form.component';
import {MatIconModule} from '@angular/material/icon'



@NgModule({
  declarations: [
    AppComponent,
    DoctorAppointmentComponent,
    DialogFormComponent
  ],
  exports: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
