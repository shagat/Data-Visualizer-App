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
  mainForm = this.fb.group({
    isCPIChecked: ['false'],
    state: [''],
    secStates: [],
    cpiArea: [],
    cpiYear: [],
    cpiProducts: [],
  });

  areas = ['Rural', 'Urban', 'Rural+Urban'];
  cpiYear = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  cpiProducts = [
    'cereals_and_products',
'clothing',
'clothing_and_footwear',
'education​​​',
'egg​​​',
'food_and_beverages​​​',
'footwear​​​',
'fruits​​​',
'fuel_and_light​​​',
'general_index​​​',
'health​​​',
'household_goods_and_services​​​',
'housing​​​',
'meat_and_fish​​​',
'milk_and_products​​​',
'miscellaneous​​​​​​',
'non_alcoholic_beverages​​​',
'oils_and_fats​​​',
'pan_tobacco_and_intoxicants​​​',
'personal_care_and_effects​​​',
'prepared_meals_snacks_sweets_etc_​​​',
'pulses_and_products​​​',
'recreation_and_amusement​​​​​​',
'spices​​​',
'sugar_and_confectionery​​​',
'transport_and_communication​​​',
'vegetables'
  ];
  // cpiProducts = [
  //   '',
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
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

  onSubmit(): void {
    let indexArea = this.mainForm.value.cpiArea;
    let indexYear = this.mainForm.value.cpiYear;
    let indexMonth = this.mainForm.value.cpiMonth;
    // console.log(indexArea, indexYear, indexMonth);
    this.dataService.getCPIData(indexArea, indexYear, indexMonth);
  }
  // onSubmit(): void {
  //   console.log(this.mainForm.value);
  // }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }

  onBeingCompared() {
    this.mainForm.addControl(
      'secStates',
      new FormControl('', Validators.required)
    );
    this.dataService.toggleTwoStates();
  }

  onRadioGSPD() {
    this.dataService.toggleCPIOptions(false);
    this.mainForm.removeControl('cpiArea');
    this.mainForm.removeControl('cpiYear');
    this.mainForm.removeControl('cpiMonth');
    this.mainForm.addControl('state', new FormControl('', Validators.required));
  }

  onRadioCPI() {
    this.dataService.toggleCPIOptions(true);
    this.mainForm.removeControl('state');
    this.mainForm.removeControl('secState');
    this.mainForm = this.fb.group({
      ...this.mainForm.controls,
      cpiArea: ['', Validators.required],
      cpiYear: ['', Validators.required],
      cpiMonth: [''],
    });
  }
}
