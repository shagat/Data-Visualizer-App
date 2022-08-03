import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATA_GOV_API } from 'src/environments/keys';
import { catchError, map, Subject, tap } from 'rxjs';
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
  url_api_2 = 'https://api.data.gov.in/resource/a12ac9a7-99a9-4808-b987-42ed0223385e?api-key='

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
          // console.log(this.resData)
          // console.log(this.resObj)
        }),
        catchError((error) => {
          throw new Error(error);
        })
      )
      .subscribe();
  }

  getLabelAndData(res: any) {
    this.fetchNameTitle();
    this.data1.datasetLabel = this.data1.datasetLabel + res[0][1];
    this.data2.datasetLabel = this.data2.datasetLabel + res[0][1];
    res.forEach((e:{}, index:number) => {
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

  getData(index: number) {
    let result = this.convertSingleJSONtoArray(this.resData[index]);
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
