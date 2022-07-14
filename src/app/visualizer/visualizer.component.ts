import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputDataService } from '../start/inputData.service';
import { InputData } from '../start/InputData.model';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  dataArraySub = new Subscription;
  inputData: InputData;
  dataPoints = [
    { name: "Apple", value: 10 },
    { name: "Orange", value: 15 },
    { name: "Banana", value: 25 },
    { name: "Mango", value: 30 },
    { name: "Grape", value: 28 }
  ]

  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.dataArraySub = this.inputDataService.inputDataChanged.subscribe((inputData: InputData) => {
      this.inputData.input = inputData.input;
      console.log(this.inputData);
    }
    )
  }


  ngOnDestroy(): void {
    this.dataArraySub.unsubscribe();
  }
}

// view: [number, number] = [700, 600];
// showXAxis = true;
// showYAxis = true;
// gradient = false;
// showLegend = true;
// showXAxisLabel = true;
// xAxisLabel = 'Inputs';
// showYAxisLabel = true;
// yAxisLabel = 'Value';

// colorScheme = {
//   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
// };
