import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subject, tap } from 'rxjs';

import { DATA_GOV_API } from 'src/environments/keys';
import { Data } from './Data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private resObj: {};
  public resData = [];
  private data1 = new Data('', '', [], []);
  private data2 = new Data('', '', [], []);
  dataSubject = new Subject<[Data, Data]>();
  url_api_gsdp =
    'https://api.data.gov.in/resource/adb4b1da-159f-46b3-a9c0-0545fe9ddda0?api-key=';
    url_api_2 =
    'https://api.data.gov.in/resource/a5df75bc-4578-48ad-bc9d-e6eb4b63de0a?api-key=';

    constructor(private httpClient: HttpClient) {}

    fetchData() {
      return this.httpClient
        .get<{}>(this.url_api_gsdp + DATA_GOV_API, {
          params: { format: 'json', limit: '35' },
        })
        .pipe(
          map((obj) => {
            this.resObj = obj;
            return obj['records'];
          }),
          tap((obj) => {
            obj.forEach((e: object) => {
              this.resData.push(e);
            });
          }),
          catchError((error) => {
            throw new Error(error);
          })
        )
    }

  // fetchData() {
  //   return this.httpClient
  //     .get<{}>(this.url_api_2 + DATA_GOV_API, {
  //       params: { format: 'json', limit: '50' },
  //     })
  //     .pipe(
  //       map((obj) => {
  //         console.log(obj)
  //         return obj['records'];
  //       }),
  //       tap((obj) => {
  //         console.log(obj)
  //       }),
  //       catchError((error) => {
  //         throw new Error(error);
  //       })
  //     )
  // }

  getLabelAndData(res: any) {
    this.fetchNameTitle();
    this.data1.datasetLabel = this.data1.datasetLabel + res[0][1];
    this.data2.datasetLabel = this.data2.datasetLabel + res[0][1];
    res.forEach((e: {}, index: number) => {
      if (index > 11) {
        this.data1.data.push(e[1]);
        this.data1.label.push(
          e[0].replace(/[a-zA-Z]+/g, '').replaceAll('_', ' ')
          );
        } else if (index > 0) {
          this.data2.data.push(e[1]);
          this.data2.label.push(
            e[0].replace(/[a-zA-Z]+/g, '').replaceAll('_', ' ')
            );
      }
    });
    // console.log(this.data); Raw data afer filter
    return;
  }

  getData(index: string) {
    console.log(this.resData);
    this.resData.every((e) => {
      if (e['state_uts'].includes(index)) {
        let result = this.convertSingleJSONtoArray(e);
        // console.log(result);
        this.getLabelAndData(result);
        this.dataSubject.next([this.data1, this.data2]);
        return false;
      }
      console.log('still going on');
      return true;
    });
  }

  getResData(){
    return this.resData.slice();
  }

  convertSingleJSONtoArray(json_data: {}) {
    var result = [];
    for (let i in json_data) {
      result.push([i, json_data[i]]);
    }
    return result;
  }

  clearData() {
    this.data1 = new Data('', '', [], []);
    this.data2 = new Data('', '', [], []);
    console.log('Data cleared');
  }

  fetchNameTitle() {
    let l: number = this.resObj['field'].length;
    this.data1.title = this.resObj['title'];
    this.data2.title = this.resObj['title'];
    this.data1.datasetLabel = this.resObj['field'][l - 1]['name'];
    this.data2.datasetLabel = this.resObj['field'][l - l + 1]['name'];
    this.data1.datasetLabel = this.data1.datasetLabel
      .replace(/[0-9]+/g, '')
      .replace('-', ' ');
    this.data2.datasetLabel = this.data2.datasetLabel
      .replace(/[0-9]+/g, '')
      .replace('-', ' ');
  }
}
