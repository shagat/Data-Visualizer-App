import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputData } from '../../InputData.model';
import { InputDataService } from '../../inputData.service';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.css']
})
export class SortItemComponent implements OnInit, OnDestroy {
  noChart: boolean;
  inputData: InputData;
  sortSub = new Subscription;
  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.sortSub = this.inputDataService.inputDataChanged.subscribe((inputdata: InputData) =>
      this.inputData = inputdata
    )
    console.log(this.inputData)
  }
  noChartListener(noChart: boolean){
    console.log(noChart);
  }
  ngOnDestroy(): void {
    this.sortSub.unsubscribe();
  }

}
