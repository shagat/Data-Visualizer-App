import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css']
})

export class DataStartComponent implements OnInit {
  dataSub = new Subscription;
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

  states : Observable<[]>;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      res
      console.log(this.states)
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
