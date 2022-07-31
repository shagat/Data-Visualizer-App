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
    // { name: 'Andhra Pradesh', abbreviation: 'AP' },
    // { name: 'Arunachal Pradesh',abbreviation: 'AR' },
    // { name: 'Assam',abbreviation: 'AS' },
    // { name: 'Bihar', abbreviation: 'BR' },
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar'
  ];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      // this.states.push(res['state_uts']);
      console.log(this.states);
    });
  }

  onSubmit(): void {

    let index = this.states.indexOf(this.addressForm.value.state);
    // console.log(this.addressForm.value.state)
    let res = this.dataService.getData(index);
    console.log(res + 'from submit');
    this.convertJtoA(res)
    // alert('Thanks!');
  }

  onSendReq() {
    console.log('sent req');
    this.dataService.fetchData();
  }

  convertJtoA(json_data:{}){
    var result = []
    for (let i in json_data){
      result.push([i, json_data[i]])
    }
    console.log(result);
    console.log(result[12][0]);
    return result
  }
}
