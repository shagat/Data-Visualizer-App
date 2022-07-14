import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputDataService } from '../start/inputData.service';
import { InputData } from '../start/InputData.model';
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
      this.previewData()
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
            backgroundColor: ['rgb(13, 110, 253)'],
          }
        ]
      },
    }
    );
  }
  previewData() {
    this.chart.config.data.datasets[0].data = this.inputData.input;
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.dataArraySub.unsubscribe();
  }
}
