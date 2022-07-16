import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  inputDataChanged = new Subject<InputData>();
  previewModeSub = new Subject<boolean>();
  private inputData: InputData = new InputData(0, [], 3);
  private dataArray: number[] = [];
  previewMode: boolean = true;
  dataKey: number;

  async submitInputData(speedValue: number, sortValue: number) {
    this.previewMode = false;
    this.previewModeSub.next(this.previewMode);

    this.inputData.algo = sortValue;
    this.inputData.speed = speedValue;
    this.inputData.input = this.dataArray; 

    await this.bubbleSorting();

    this.previewMode = true;
    this.previewModeSub.next(this.previewMode)
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

  async bubbleSorting() {
    let n = (this.inputData.input).length;
    for (let i = 0; i < (n - 1); i++) {
      let isChanged = false;
      console.log('Pass: ' + (i + 1))
      this.letDelay()
      for (let j = 0; j < (n - 1 - i); j++) {
        if ((this.inputData.input)[j + 1] < (this.inputData.input)[j]) {
          let temp = (this.inputData.input)[j + 1];
          (this.inputData.input)[j + 1] = (this.inputData.input)[j];
          (this.inputData.input)[j] = temp;
          isChanged = true;
          this.inputDataChanged.next(this.inputData);
          await this.letDelay()
        }
      }
      if (isChanged == false) {
        break;
      }
    }
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  letDelay() {
    return new Promise(resolve => setTimeout(resolve, (1000 - 150 * this.inputData.speed)));
  }
}