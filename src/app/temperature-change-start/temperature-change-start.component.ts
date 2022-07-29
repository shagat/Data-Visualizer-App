import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { WEATHER_API } from 'src/environments/keys';
import { TemperatureChangeService } from './temperature-change.service';

@Component({
  selector: 'app-temperature-change-start',
  templateUrl: './temperature-change-start.component.html',
  styleUrls: ['./temperature-change-start.component.css'],
})
export class TemperatureChangeStartComponent{
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
    private tempService: TemperatureChangeService,
    private httpClient: HttpClient
  ) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  onSendReq() {
    console.log('sent req');
    let sendObs: Observable<{}>;
    sendObs = this.tempService.getData();
    sendObs.subscribe(resData => {
      console.log(resData);
    }), err => {
      console.log(err);
    }
    // this.httpClient
    // .post<{}>(
    //   'https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=28.704060&lon=77.102493&dt=1643803200&appid=' +
    //     WEATHER_API,
    //   {}
    //   )
    //   .pipe(
    //       catchError((err) =>
    //         throwError(() => {
    //           return err;
    //         })
    //       )
    //     )
    //   .subscribe(resData => {
    //     console.log(resData);
    //   })
    // this.tempService.getData();
  }
}
