import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  inputDataChanged = new Subject<InputData>();
  private inputData: InputData = new InputData(0, [], 3);
  private dataArray: number[] = [];
  dataKey: number;

  submitInputData(inputData: InputData) {
    this.inputData.algo = inputData.algo;
    this.inputData.speed = inputData.speed;
    this.inputData.input = this.dataArray;
    this.inputDataChanged.next(this.inputData)
  }

  // setInputData(){
  //   this.inputData.algo = inputData.algo;
  //   this.inputData.speed = inputData.speed;
  //   this.inputData.input = this.dataArray;
  //   this.inputDataChanged.next(this.inputData)
  // }

  setDataKey(dataKey: number) {
    this.dataKey = dataKey;
    this.spawnDataArray();
    this.inputDataChanged.next(this.inputData);
  }

  spawnDataArray() {
    this.dataArray = Array.from({ length: +(this.dataKey) }, () => Math.floor(Math.random() * 40));
    this.inputData.input = this.dataArray;
  }

  // suffleArray() {
  //   for (var a = [], i = 0; i < 40; ++i) a[i] = i;
  //   function shuffle(array) {
  //     var tmp, current, top = array.length;
  //     if (top) while (--top) {
  //       current = Math.floor(Math.random() * (top + 1));
  //       tmp = array[current];
  //       array[current] = array[top];
  //       array[top] = tmp;
  //     }
  //     return array;
  //   }
  //   a = shuffle(a);
  // }
}