import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputDataService } from '../start/inputData.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  dataArraySub = new Subscription;
  dataJSONArray: [{ name: number, value: number }] = [{ name: 0, value: 0 }];
  dataPoints = [
    { name: "Apple", value: 10 },
    { name: "Orange", value: 15 },
    { name: "Banana", value: 25 },
    { name: "Mango", value: 30 },
    { name: "Grape", value: 28 }
  ]

  //Options for charts
  view: [number, number] = [700, 600];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Inputs';
  showYAxisLabel = true;
  yAxisLabel = 'Value';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.dataArraySub = this.inputDataService.dataJSONArrayChanged.subscribe((dataJSONArray: [{ name: number, value: number }]) => {
      this.dataJSONArray = dataJSONArray;
    }
    )
  }

  onSelect(event) {
    console.log(event)
  }

  ngOnDestroy(): void {
    this.dataArraySub.unsubscribe();
  }

}

// chartOptions = {
//   backgroundColor: "#F5DEB3",
//   title: {
//     text: "Basic Column Chart in Angular"
//   },
//   data: [{
//     type: "column",
//     dataPoints: [
//       { label: "Apple", y: 10 },
//       { label: "Orange", y: 15 },
//       { label: "Banana", y: 25 },
//       { label: "Mango", y: 30 },
//       { label: "Grape", y: 28 }
//     ]
//   }
// ]
// };