import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API } from 'src/environments/keys';
import { catchError, map, Subject, tap } from 'rxjs';
import { Data } from './Data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  public ResData = [];
  private data = new Data('','',[],[]);
  dataSubject = new Subject<Data>();
  url_api =
    'https://api.data.gov.in/resource/adb4b1da-159f-46b3-a9c0-0545fe9ddda0?api-key=';

  constructor(private httpClient: HttpClient) {}

  fetchData() {
    let resData = [];
    return this.httpClient
      .get<{}>(this.url_api + DATA_GOV_API, {
        params: { format: 'json', limit: '35' },
      })
      .pipe(
        map((obj) => {
          this.data.title = obj['title'];
          console.log(this.data.title);
          console.log(obj);
          return obj['records'];
        }),
        tap((obj) => {
          obj.forEach((e: object) => {
            resData.push(e);
          });
          this.ResData = resData;
        }),
        catchError((error) => {
          throw new Error(error);
        })
      )
      .subscribe();
  }

  getLabelAndData(res: any) {
    this.data.datasetLabel = res[0][1];
    res.forEach((e, index) => {
      if (index > 11) {
        this.data.data.push(e[1]);
        this.data.label.push('20'+index);
      }
    });
    console.log(this.data);
    return;
  }

  getData(index: number) {
    let result = this.convertSingleJSONtoArray(this.ResData[index]);
    this.getLabelAndData(result);
    this.dataSubject.next(this.data);
  }

  convertSingleJSONtoArray(json_data: {}) {
    var result = [];
    for (let i in json_data) {
      result.push([i, json_data[i]]);
    }
    return result;
  }
}
