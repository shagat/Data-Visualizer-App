import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputData } from '../../InputData.model';
import { SortingService } from '../../sorting.service';

@Component({
  selector: 'app-sort-item',
  templateUrl: './sort-item.component.html',
  styleUrls: ['./sort-item.component.css']
})
export class SortItemComponent implements OnInit {
  inputData: InputData;
  sortSub = new Subscription;
  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.inputData = this.sortingService.getInputData();
    this.sortSub = this.sortingService.inputDataChanged.subscribe((inputdata: InputData) =>
      this.inputData = inputdata
    )
    console.log(this.inputData)
  }

}
