import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
  providedIn: 'root'
})
export class InputDataService {
  inputDataChanged = new Subject<InputData>();
  dataJSONArrayChanged = new Subject<[{ x: any, y: number }]>();
  private inputData: InputData;
  private dataArray: number[] = [];
  private dataJSONArray: [{ x: number, y: number }] = [{x: 0, y: 0}];
  public inputValue: number = 15;

  setInputData(inputData: InputData) {
    this.inputData.algo = inputData.algo;
    this.inputData.speed = inputData.speed;
    this.inputData.input = this.dataArray;
    this.inputDataChanged.next(this.inputData)
  }

  setInputValue(inputValue: number) {
    this.inputValue = inputValue;
    this.getDataArray();
    this.arrayToJSONArray();
    this.dataJSONArrayChanged.next(this.dataJSONArray);
  }

  arrayToJSONArray() {
    this.dataArray.forEach((value, key) => {
      this.dataJSONArray.push(
        { x: (+key), y: (+value) }
      )
      console.log(key, value)
    }
    )
    console.log(this.dataJSONArray)
  }

  getInputData() {
    return this.inputData;
  }

  getDataArray() {
    this.dataArray = Array.from({ length: +(this.inputValue) }, () => Math.floor(Math.random() * 40));
  }

  suffleArray() {
    for (var a = [], i = 0; i < 40; ++i) a[i] = i;
    function shuffle(array) {
      var tmp, current, top = array.length;
      if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
    a = shuffle(a);
  }
}