import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY"
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD-MM-YYYY",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

class DoctorAppointment {
  Id = Date.now();
  First_Name: string | '';
  Last_Name: string | '';
  Gender: string | '';
  Email: string | '';
  Age: number |'';
  Date: Date | '';
  Time: string | '';
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DialogFormComponent implements OnInit {
  form: FormGroup;
  public showSpinners = true;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public showSeconds = false;
  public enableMeridian = false;
  date = new Date();
  dateTime = moment(this.date).format("hh:mm A")
  action: string = '';

  doctorAppointment: DoctorAppointment = new DoctorAppointment();

  constructor(private dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private fb: FormBuilder) {
      console.log('data', data);

      this.doctorAppointment.Gender = 'Male'
      this.action = data.action
      if(this.action == 'edit') {
        this.doctorAppointment = data.data
        let splitData = data.data.Date.split('-');
        let addData = splitData[1] + " " + splitData[0] + " " + splitData[2];
        this.date = new Date(addData);
        this.dateTime = data.data.Time;
      }
     }

  ngOnInit(): void {
    // this.doctorAppointment.Gender = 'Female'
    this.getForm();
  }

  getForm() {
    this.form = this.fb.group({
      Id: [this.doctorAppointment.Id],
      First_Name: [this.doctorAppointment.First_Name, [Validators.required, Validators.maxLength(40)]],
      Last_Name: [this.doctorAppointment.Last_Name, [Validators.required, Validators.maxLength(40)]],
      Email: [this.doctorAppointment.Email, [Validators.required, Validators.email]],
      Gender: [this.doctorAppointment.Gender],
      Age: [this.doctorAppointment.Age],
      Date: [this.date,[Validators.required]],
      Time: [this.dateTime]
    })
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }

  onChangeHour(event) {
    this.form.patchValue({Time: event});
  }

  onSubmit() {
    let doctorAppointmentData = JSON.parse(localStorage.getItem('DoctorAppointmentData')) || [];
    console.log(this.form.value);

    this.form.patchValue({
      Date: moment(this.form.get('Date').value).format('DD-MM-YYYY')
    });

    if(this.action == 'edit') {
      doctorAppointmentData = doctorAppointmentData.map(x => x.Id !== this.doctorAppointment.Id ? x : this.form.value);

      localStorage.setItem('DoctorAppointmentData', JSON.stringify(doctorAppointmentData));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'doctor appoinment is updated successfully',
        showConfirmButton: false,
        timer: 1500
      });

      this.form.reset();
      this.dialogRef.close()

    } else {
      doctorAppointmentData.unshift(this.form.value);

      localStorage.setItem('DoctorAppointmentData', JSON.stringify(doctorAppointmentData));
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'doctor appoinment is saved successfully',
        showConfirmButton: false,
        timer: 500
      });

      this.form.reset();
      this.dialogRef.close()
    }
  }

  closeDialog() {
    this.dialogRef.close()
  }

}

