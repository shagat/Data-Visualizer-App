import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DataService } from './data.service';
import { DataStartOption } from './dataStart.model';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css'],
})
export class DataStartComponent implements OnInit {
  dataSub = new Subscription();
  dataStartOptions = new DataStartOption(false, false);
  dataGSDP = {};
  stateForm = this.fb.group({
    isCPIChecked: ['false'],
    state: [''],
    secStates: [],
    cpiArea: [],
    cpiYear: [],
    cpiMonth: [],
  });

  areas = ['Rural', 'Urban', 'Rural+Urban'];
  cpiYear = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  cpiMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
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

  ngOnInit(): void {
    this.dataService.twoStatesSubject.subscribe((res) => {
      this.dataStartOptions = res;
    });
  }

  // onSubmit(): void {
  //   let index = this.stateForm.value.state;
  //   let index2 = this.stateForm.value.secStates;
  //   console.log(index, index2);
  //   if (this.dataStartOptions.twoStates) {
  //     if (index == index2) {
  //       window.alert('Given same input');
  //       return;
  //     } else if (index == null || index2 == null) {
  //       window.alert('Input required');
  //       return;
  //     } else {
  //       console.log('Done two inputs');
  //       // this.dataService.getTwoData(index, index2);
  //     }
  //   } else {
  //     console.log('Done one inputs');
  //     // this.dataService.getData(index);
  //   }
  // }
  onSubmit(): void {
    console.log(this.stateForm.value);
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }

  onBeingCompared() {
    this.stateForm.addControl(
      'secStates',
      new FormControl('', Validators.required)
    );
    this.dataService.toggleTwoStates();
  }

  onRadioGSPD() {
    this.dataStartOptions.optionCPI = false;
    this.stateForm.removeControl('cpiArea');
    this.stateForm.addControl(
      'state',
      new FormControl('', Validators.required)
    );
    console.log('change to the radio of GSDP');
  }

  onRadioCPI() {
    this.dataStartOptions.optionCPI = true;
    this.stateForm.removeControl('state');
    this.stateForm.addControl(
      'cpiArea',
      new FormControl('', Validators.required)
    );
    this.stateForm.addControl(
      'cpiYear',
      new FormControl('2013', Validators.required)
    );
    this.stateForm.addControl('cpiMonth', new FormControl('all'));
    console.log('change to the radio of CPI');
    // this.stateForm.
  }

  onClickFetch() {
    console.log('Sent req');
    this.dataService.fetchDataTwo();
  }
}
