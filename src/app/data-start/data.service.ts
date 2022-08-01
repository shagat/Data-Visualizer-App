import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API, WEATHER_API } from 'src/environments/keys';
import { catchError, map, Subject, tap, throwError } from 'rxjs';
import { Data } from './Data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  public ResData = [];
  private data = new Data('title',['label'],[0]);
  dataSubject = new Subject<string[]>();
  url_api =
    'https://api.data.gov.in/resource/adb4b1da-159f-46b3-a9c0-0545fe9ddda0?api-key=';

  constructor(private httpClient: HttpClient) {}

  fetchData() {
    return this.httpClient
      .get<{}>(this.url_api + DATA_GOV_API, {
        params: { format: 'json', limit: '35' },
      })
      .pipe(
        map((obj) => {
          obj['records'].forEach((e: object) => {
            this.ResData.push(e);
          });
        }),
        catchError((error) => {
          throw new Error(error);
        })
      )
      .subscribe();
  }

  getData(index: number) {
    console.log(this.ResData);
    this.ResData = this.convertSingleJSONtoArray(this.ResData[index]);
    this.dataSubject.next(this.ResData);
  }

  convertSingleJSONtoArray(json_data: {}) {
    var result = [];
    for (let i in json_data) {
      result.push([i, json_data[i]]);
    }
    return result;
  }
}
