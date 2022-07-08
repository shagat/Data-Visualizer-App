import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
    providedIn: 'root'
})
export class SortingService {
    inputDataChanged = new Subject<InputData>();
    private inputData: InputData;
    private dataArray: number[] = [];
    public inputValue: number = 15;

    setInputData(inputData: InputData){
        this.inputData = inputData;
        this.inputDataChanged.next(this.inputData)
    }

    getInputData(){
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