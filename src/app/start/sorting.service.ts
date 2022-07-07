import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { InputData } from "./InputData.model";

@Injectable({
    providedIn: 'root'
})
export class SortingService {
    inputDataChanged = new Subject<InputData>();
    private inputData: InputData;

    setInputData(inputData: InputData){
        this.inputData = inputData;
        this.inputDataChanged.next(this.inputData)
    }
    getInputData(){
        return this.inputData;
    }
}