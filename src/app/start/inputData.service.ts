import { Injectable } from "@angular/core";
import { findIndex, Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  inputDataChanged = new Subject<InputData>();
  indexDataChanged = new Subject<[number, number]>();
  previewModeSub = new Subject<boolean>();
  private inputData: InputData = new InputData(0, [], 3);
  private dataArray: number[] = [];
  previewMode: boolean = true;
  dataKey: number;
  isCancelled = false;

  async submitInputData(speedValue: number, sortValue: number) {
    this.previewMode = false;
    this.previewModeSub.next(this.previewMode);

    this.inputData.algo = sortValue;
    this.inputData.speed = speedValue;
    this.inputData.input = this.dataArray;

    await this.bubbleSort();
    // await this.sortingCordinator();

    this.previewMode = true;
    this.previewModeSub.next(this.previewMode)
  }

  async sortingCordinator(){
    switch (this.inputData.algo) {
      case 1:
        console.log('witch case bubble sort')
        await this.bubbleSort();
        break;
      case 2:
        console.log('witch case insertion sort')
        await this.insertionSort();
        break;
      case 3:
        
        break;
      case 4:
        
        break;
      case 5:
        
        break;
    }
    return new Promise(resolve => setTimeout(resolve, 200));
  }

  setDataKey(dataKey: number) {
    this.dataKey = dataKey;
    this.spawnDataArray();
    this.inputDataChanged.next(this.inputData);
  }

  spawnDataArray() {
    this.dataArray = Array.from({ length: +(this.dataKey) }, () => Math.floor(Math.random() * 40));
    this.inputData.input = this.dataArray;
  }

  shuffleArray() {
    for (let i = this.dataArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.dataArray[i], this.dataArray[j]] = [this.dataArray[j], this.dataArray[i]];
    }
    this.inputDataChanged.next(this.inputData);
  }

  async bubbleSort() {
    try {
      let n = (this.inputData.input).length;
      for (let i = 0; i < (n - 1); i++) {
        let isChanged = false;
        console.log('Pass: ' + (i + 1))
        this.letDelay()
        for (let j = 0; j < (n - 1 - i); j++) {
          if ((this.inputData.input)[j + 1] < (this.inputData.input)[j]) {
            await this.checkIndexOf(this.inputData.input[j], this.inputData.input[j+1])
            let temp = (this.inputData.input)[j + 1];
            (this.inputData.input)[j + 1] = (this.inputData.input)[j];
            (this.inputData.input)[j] = temp;
            isChanged = true;
            this.inputDataChanged.next(this.inputData);
            await this.letDelay();
          }
        }
        if (isChanged == false) {
          break;
        }
      }
    } catch (isCancelled) {
      confirm('Cancel action?');
    } finally{
      console.log('finished sorting');
      return;
    }
  }

  async insertionSort() {
    let n = (this.inputData.input).length;
    for (let i = 1; i < n; i++) {
      let key = this.inputData.input[i];
      let j = (i - 1);
      while (j >= 0 && this.inputData.input[j] > key) {
        await this.checkIndexOf(this.inputData.input[j], this.inputData.input[j + 1])
        this.inputData.input[j + 1] = this.inputData.input[j];
        j--;
        this.inputDataChanged.next(this.inputData);
        await this.letDelay();
      }
      this.inputData.input[j + 1] = key;
    }
    // console.log(a)
    return;
  }

  letDelay() {
    return new Promise(resolve => setTimeout(resolve, (1000 - 150 * this.inputData.speed)));
  }

  checkIndexOf(a: number, b: number) {
    let indexa = this.inputData.input.indexOf(a);
    let indexb = this.inputData.input.indexOf(b);
    this.indexDataChanged.next([indexa, indexb]);
    return new Promise(resolve => setTimeout(resolve, 300));
  }
}
