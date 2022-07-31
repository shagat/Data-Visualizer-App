import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API, WEATHER_API } from 'src/environments/keys';
import { catchError, map, Subject, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  public ResData = [];
  dataSubject = new Subject<{}>();
  url_api =
    'https://api.data.gov.in/resource/adb4b1da-159f-46b3-a9c0-0545fe9ddda0?api-key=';

  fetchData() {
    return this.httpClient
      .get<{}>(this.url_api + DATA_GOV_API, {
        params: { format: 'json', limit: '35' },
      })
      .pipe(
        map((obj) => {
          obj['records'].forEach((e: object) => {
            this.ResData.push(e);
            // this.dataSubject.next(e);
          });
        }),
        catchError((error) => {
          throw new Error(error);
        })
      )
      .subscribe();
  }

  getData(index: string){
    console.log(this.ResData);
    return (this.ResData['state_uts'].indexOf('Assam'));
  }

  constructor(private httpClient: HttpClient) {}
}
