import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API } from 'src/environments/keys';
import { catchError, map, Subject, tap } from 'rxjs';
import { Data } from './Data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  public ResData = [];
  private data1 = new Data('t', '', [], []);
  private data2 = new Data('t', '', [], []);
  dataSubject = new Subject<[Data, Data]>();
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
          this.data1.title = obj['title'];
          this.data2.title = obj['title'];
          let l: number = obj['field'].length;
          // console.log((obj['field'][1]['name']));
          // console.log((obj['field'][l-1]['name']));
          // console.log((obj['field'][(l- l + 1)]['name']));
          this.data1.datasetLabel = obj['field'][l - l + 1]['name'];
          this.data2.datasetLabel = obj['field'][l - 1]['name'];
          this.data1.datasetLabel.replace('0', '');
          this.data2.datasetLabel.replace(/[0-9]+/g, '');
          console.log(this.data1.datasetLabel, this.data2.datasetLabel);
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
    this.data1.datasetLabel = this.data1.datasetLabel + res[0][1];
    this.data2.datasetLabel = this.data2.datasetLabel + res[0][1];
    res.forEach((e, index) => {
      if (index > 11) {
        // console.log(e);
        this.data1.data.push(e[1]);
        this.data1.label.push('20' + index);
      } else if (index > 0) {
        // console.log(e);
        this.data2.data.push(e[1]);
        if (index > 9) {
          this.data2.label.push('20' + index);
        } else {
          this.data2.label.push('200' + index);
        }
      }
    });
    // console.log(this.data); Raw data afer filter
    return;
  }

  getData(index: number) {
    let result = this.convertSingleJSONtoArray(this.ResData[index]);
    this.getLabelAndData(result);
    this.dataSubject.next([this.data1, this.data2]);
  }

  convertSingleJSONtoArray(json_data: {}) {
    var result = [];
    for (let i in json_data) {
      result.push([i, json_data[i]]);
    }
    return result;
  }
}
