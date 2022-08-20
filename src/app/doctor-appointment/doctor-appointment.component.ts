import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  getDoctorAppoinmentList = JSON.parse(localStorage.getItem('DoctorAppointmentData')) || [];
  months = [
    {"id": 1, "name": "January"},
    {"id": 2, "name": "Fabruary"},
    {"id": 3, "name": "March"},
    {"id": 4, "name": "April"},
    {"id": 5, "name": "May"},
    {"id": 6, "name": "June"},
    {"id": 7, "name": "July"},
    {"id": 8, "name": "Auguest"},
    {"id": 9, "name": "September"},
    {"id": 10, "name": "October"},
    {"id": 11, "name": "November"},
    {"id": 12, "name": "December"}
  ]

  monthId: number;
  dayCount: number;
  date = new Date();
  dataMonthList: any[] = [];
  dataDayList: any[] = [];

  constructor(private dialog: MatDialog,
              private route:ActivatedRoute) {

                let id = +this.route.snapshot.params['id'];
                if(id>=1 || id<=12){
                this.monthId = id;
                this.getMonthId(this.monthId);
                }
              }

  ngOnInit(): void { }

  getDataByDayMonth(monthId) {
    this.dataMonthList = this.getDoctorAppoinmentList.filter(x => parseInt(x.Date.split("-")[1]) == monthId);
  }

  getRowNumber(i:number){

     if(i==0){return 0;}
     else{
      if(i % 6 == 0 )
      {
        return 0;
      }
      else
      {
        return 1;
      }
     }
  }
  getDay(i:number) {
    return i>this.dayCount?'':i;
  }

  counter(i:number) {
    return new Array(i);
  }

  getMonthId(value) {
    this.dayCount = this.getDaysInMonth(2022, value);
    this.getDataByDayMonth(value);
  }

  getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  openDialog() {
    this.dialog.open(DialogFormComponent, {
      data: 'masum',
      width: '50%',
      height: '60%'
    });
  }

  // get data by day and sort by time
  getDayData(value: any) {
    this.dataDayList = this.dataMonthList
      .filter(x => parseInt(x.Date.split("-")[0]) == value)
      .sort((a, b) => {
        return a.Time.localeCompare(b.Time);
      });

    return this.dataDayList;
  }

  // edit data
  editData(row) {

    this.dialog.open(DialogFormComponent, {
      data: {
        data: row,
        action: 'edit'
      },
      width: '50%',
      height: '60%'
    });
    // console.log('row data', row);
  }

}

