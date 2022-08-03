import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css'],
})
export class DataStartComponent implements OnInit {
  dataSub = new Subscription();
  dataGSDP = {};
  stateForm = this.fb.group({
    state: ['Assam', Validators.required],
    shipping: ['gsdp', Validators.required],
  });

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharastra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman & Nicobar Islands',
    'Chandigarh',
    'Delhi',
    'Jammu & Kasmir-U.T.',
    'Puducherry',
  ];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    // this.dataSub = this.dataService.dataSubject.subscribe();
  }

  onSubmit(): void {
    let index = this.states.indexOf(this.stateForm.value.state);
    // console.log(index);
    this.dataService.getData(index);
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }
}
