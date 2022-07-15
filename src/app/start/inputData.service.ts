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

  submitInputData(speedValue: number, sortValue: number) {
    this.previewMode = false;
    this.previewModeSub.next(this.previewMode);
    this.inputData.algo = sortValue;
    this.inputData.speed = speedValue;
    this.inputData.input = this.dataArray;
    
    setTimeout(() => {
      console.log(this.inputData);
      this.previewMode = true;
      this.previewModeSub.next(this.previewMode)
    },5000)
    
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
}