import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, map, Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-data-start',
  templateUrl: './data-start.component.html',
  styleUrls: ['./data-start.component.css'],
})
export class DataStartComponent implements OnInit {
  dataSub = new Subscription();
  dataGSDP = {};
  addressForm = this.fb.group({
    state: [null, Validators.required],
    shipping: ['free', Validators.required],
  });

  hasUnitNumber = false;

  // states: Observable<{}>;
  states = [
    { name: 'Andhra Pradesh', abbreviation: 'AP' },
    { name: 'Arunachal Pradesh',abbreviation: 'AR' },
    { name: 'Assam',abbreviation: 'AS' },
    { name: 'Bihar', abbreviation: 'BR' },
  ];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      this.states.push(res['state_uts']);
      console.log(this.states);
    });
  }

  onSubmit(): void {
    let res = this.dataService.getData(this.addressForm.value.state);
    // console.log(this.addressForm.value.state)
    console.log(res);
    // alert('Thanks!');
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }
}
