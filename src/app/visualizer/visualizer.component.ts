import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputDataService } from '../start/inputData.service';
import { InputData } from '../start/InputData.model';
// import { Chart } from 'chart.js/auto';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  dataArraySub = new Subscription;
  inputData: InputData = new InputData(0, [], 0);
  chart: Chart;

  constructor(private inputDataService: InputDataService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.dataArraySub = this.inputDataService.inputDataChanged.subscribe((inputData: InputData) => {
      this.inputData.input = inputData.input;
      console.log(this.inputData);
    }
    )
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: 'inputs',
            data: this.inputData.input,
          }
        ]
      }
    });
  }
  previewData() {
    // this.chart.data.datasets.indexOf.push(this.inputData.input);
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.dataArraySub.unsubscribe();
  }
}

// dataPoints = [
//   { name: "Apple", value: 10 },
//   { name: "Orange", value: 15 },
//   { name: "Banana", value: 25 },
//   { name: "Mango", value: 30 },
//   { name: "Grape", value: 28 }
// ]

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
