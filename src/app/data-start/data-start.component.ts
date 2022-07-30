import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TemperatureChangeService } from '../temperature-change-start/temperature-change.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css']
})

export class DataStartComponent implements OnInit {
  dataSub = new Subscription();
  dataGSDP = {};
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    ],
    shipping: ['free', Validators.required],
  });

  hasUnitNumber = false;

  states = [
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
  ];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((resData) => {
      this.dataGSDP = resData
      console.log(this.dataGSDP);
    })
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.getData();
  }
}
