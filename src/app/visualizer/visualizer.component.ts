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
  previewIndexData: number[] = [];
  chart: Chart;

  constructor(private inputDataService: InputDataService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.dataArraySub = this.inputDataService.inputDataChanged.subscribe((inputData: InputData) => {
      this.inputData.input = inputData.input;
      this.previewIndexData = inputData.input.map((value, index) => {
        return index
      })
      this.previewData()
    }
    )

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.previewIndexData,
        datasets: [
          {
            label: 'Value',
            data: this.inputData.input,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 159, 64, 0.5)',
              'rgba(255, 205, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(201, 203, 207, 0.5)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
          }
        ]
      },
    }
    );
  }

  previewData() {
    this.chart.config.data.labels = this.previewIndexData;
    this.chart.config.data.datasets[0].data = this.inputData.input;
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
    this.dataArraySub.unsubscribe();
  }
}
