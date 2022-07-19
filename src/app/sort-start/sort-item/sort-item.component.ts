import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputData } from '../InputData.model';
import { InputDataService } from '../inputData.service';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.css']
})
export class SortItemComponent implements OnInit, OnDestroy {
  noChart: boolean = true;
  inputData: InputData;
  sortSub = new Subscription;
  sortFinished = new Subscription;
  timeComplexity: [string, string,string,string] = null;
  toTC: any;
  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.sortSub = this.inputDataService.inputDataChanged.subscribe((inputdata: InputData) =>
      this.inputData = inputdata
    )
    this.sortFinished = this.inputDataService.sortingFinished.subscribe((sortingFinishedString: [string, string, string, string]) => {
      this.timeComplexity = sortingFinishedString;
      this.toTC = setTimeout(() => {
        this.timeComplexity = null;
      }, 20000);
    })
  }

  noChartListener(noChart: boolean) {
    this.noChart = noChart;
  }

  ngOnDestroy(): void {
    // this.toTC.clearTimeout();
    this.sortSub.unsubscribe();
  }

}
