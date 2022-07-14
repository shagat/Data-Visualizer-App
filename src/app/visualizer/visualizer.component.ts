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
      type: 'line',
      data: {
        labels: this.previewIndexData,
        datasets: [
          {
            label: 'Value',
            data: this.inputData.input,
            backgroundColor: ['rgb(13, 110, 253)'],
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
    this.dataArraySub.unsubscribe();
  }
}
