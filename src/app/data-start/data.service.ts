import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subject, tap } from 'rxjs';

import { DATA_GOV_API } from 'src/environments/keys';
import { Data } from './Data.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  twoStates = false;
  private resObj: {};
  public resData = [];
  private data1 = new Data('', '', [], []);
  private data2 = new Data('', '', [], []);
  private secData1 = new Data('', '', [], []);
  private secData2 = new Data('', '', [], []);
  private tempData1 = new Data('', '', [], []);
  private tempData2 = new Data('', '', [], []);
  dataSubject = new Subject<[Data, Data, Data, Data]>();
  twoStatesSubject = new Subject<boolean>();

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
      );
  }
  fetchDataTwo() {
    return this.httpClient
      .get<{}>(this.url_api_2 + DATA_GOV_API, {
        params: { format: 'json', limit: '50' },
      })
      .pipe(
        map((res) => {
          return res['records'];
        }),
        tap((res) => {res.forEach(element => {
          // res.keys(element);
          console.log(element);
        });
        }),
        catchError((error) => {
          throw new Error(error);
        })
      ).subscribe();
  }

  getLabelAndData(res: any) {
    this.fetchNameTitle();
    this.tempData1.datasetLabel = this.tempData1.datasetLabel + res[0][1];
    this.tempData2.datasetLabel = this.tempData2.datasetLabel + res[0][1];
    res.forEach((e: {}, index: number) => {
      if (index > 11) {
        this.tempData1.data.push(e[1]);
        this.tempData1.label.push(
          e[0].replace(/[a-zA-Z]+/g, '').replaceAll('_', ' ')
        );
      } else if (index > 0) {
        this.tempData2.data.push(e[1]);
        this.tempData2.label.push(
          e[0].replace(/[a-zA-Z]+/g, '').replaceAll('_', ' ')
        );
      }
    });
    return;
  }

  fetchNameTitle() {
    let l: number = this.resObj['field'].length;
    this.tempData1.title = this.resObj['title'];
    this.tempData2.title = this.resObj['title'];
    this.tempData1.datasetLabel = this.resObj['field'][l - 1]['name'];
    this.tempData2.datasetLabel = this.resObj['field'][l - l + 1]['name'];
    this.tempData1.datasetLabel = this.tempData1.datasetLabel
      .replace(/[0-9]+/g, '')
      .replace('-', ' ');
    this.tempData2.datasetLabel = this.tempData2.datasetLabel
      .replace(/[0-9]+/g, '')
      .replace('-', ' ');
  }

  getData(index: string) {
    this.clearTemp();
    this.clearData();
    this.resData.every((e) => {
      if (e['state_uts'].includes(index)) {
        let result = this.convertSingleJSONtoArray(e);
        this.getLabelAndData(result);
        this.data1 = this.tempData1;
        this.data2 = this.tempData2;
        this.dataSubject.next([
          this.data1,
          this.data2,
          this.secData1,
          this.secData2,
        ]);
        return false;
      }
      return true;
    });
  }

  getTwoData(index: string, index2: string) {
    let result = [];
    let result2 = [];
    this.clearTemp();
    this.clearData();
    this.resData.forEach((e) => {
      if (e['state_uts'].includes(index)) {
        result = this.convertSingleJSONtoArray(e);
        this.getLabelAndData(result);
        this.data1 = this.tempData1;
        this.data2 = this.tempData2;
        this.clearTemp();
      }
      if (e['state_uts'].includes(index2)) {
        result2 = this.convertSingleJSONtoArray(e);
        this.getLabelAndData(result2);
        this.secData1 = this.tempData1;
        this.secData2 = this.tempData2;
        this.clearTemp();
      }
    });
    this.dataSubject.next([
      this.data1,
      this.data2,
      this.secData1,
      this.secData2,
    ]);
  }

  getResData() {
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
    if (this.data1.data.length == 0) {
      this.data1 = new Data('', '', [], []);
      this.data2 = new Data('', '', [], []);
      this.secData1 = new Data('', '', [], []);
      this.secData2 = new Data('', '', [], []);
      console.log('Data cleared!');
    }
    console.log('No data to clear!');
  }

  clearTemp() {
    this.tempData1 = new Data('', '', [], []);
    this.tempData2 = new Data('', '', [], []);
  }

  toggleTwoStates() {
    this.twoStates = !this.twoStates;
    this.twoStatesSubject.next(this.twoStates);
  }
}
