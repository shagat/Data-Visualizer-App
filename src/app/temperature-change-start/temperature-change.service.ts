import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WEATHER_API } from 'src/environments/keys';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemperatureChangeService {
  ResData: {};

  getData() {
    return this.httpClient
      .post<{}>(
        'https://api.weatherapi.com/v1/history.json?key=' + WEATHER_API,{},
        {params: {q:'New Delhi', dt:'2010-01-01'}}
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
