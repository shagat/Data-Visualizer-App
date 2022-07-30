import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API, WEATHER_API } from 'src/environments/keys';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemperatureChangeService {
  public ResData: {};
  url_api =
    'https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=28.704060&lon=77.102493&dt=1643803200&appid=';

  onGetReq() {
    console.log('sent req');
    this.httpClient
      .get<{}>(this.url_api + WEATHER_API, {})
      .pipe(
        catchError((err) =>
          throwError(() => {
            return err;
          })
        )
      )
      .subscribe((resData) => {
        console.log(resData);
      });
  }

  constructor(private httpClient: HttpClient) {}
}
