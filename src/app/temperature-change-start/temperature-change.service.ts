import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WEATHER_API } from 'src/environments/keys';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemperatureChangeService {
  ResData: {};

  getData() {
    return this.httpClient
      .post<{}>(
        'https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=28.704060&lon=77.102493&dt=1643803200&appid=' +
          WEATHER_API,
        {}
      )
      .pipe(
        catchError((err) =>
          throwError(() => {
            return err;
          })
        )
      );
  }

  constructor(private httpClient: HttpClient) {}
}
