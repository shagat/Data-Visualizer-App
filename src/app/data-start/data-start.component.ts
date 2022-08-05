import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { DataService } from './data.service';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css'],
})
export class DataStartComponent implements OnInit {
  dataSub = new Subscription();
  compareToggle: boolean = false;
  dataGSDP = {};
  stateForm = this.fb.group({
    state: ['', Validators.required],
    secStates: [],
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
    'Jammu & Kashmir-U.T.',
    'Puducherry',
  ];
  secStates = [
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
    'Jammu & Kashmir-U.T.',
    'Puducherry',
  ];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let index = this.stateForm.value.state;
    let index2 = this.stateForm.value.secStates;
    console.log(index, index2);
    if(index == index2){
      alert('Same input given.')
      return;
    } else{
      console.log('Done');
      this.dataService.getData(index);
    }
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }

  onBeingCompared() {
    this.stateForm.addControl('secStates', new FormControl('',Validators.required))
    this.compareToggle = !this.compareToggle;
  }
}
