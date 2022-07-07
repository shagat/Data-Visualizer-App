import { Component, OnInit } from '@angular/core';
import { InputData } from '../InputData.model';

@Component({
  selector: 'app-sort-start',
  templateUrl: './sort-start.component.html',
  styleUrls: ['./sort-start.component.css']
})
export class SortStartComponent implements OnInit {
  inputValue = 2;
  speedValue = 1;
  sortValue: string;
  dataArray: number[] = [];
  inputData: InputData;


  constructor() { }

  ngOnInit(): void {
  }

  getDataArray() {
    this.dataArray = Array.from({ length: +(this.inputValue) }, () => Math.floor(Math.random() * 40));
  }

  onSubmit() {
    this.getDataArray();
    this.inputData = new InputData(this.sortValue, this.dataArray, this.speedValue);
    console.log(this.inputData);

  }

}
