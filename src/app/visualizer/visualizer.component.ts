import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  private dataArraySub = new Subscription;
  private indexDataSub = new Subscription;
  inputData: InputData = new InputData(0, [], 0);
  previewIndexData: number[] = [];
  activeIndex: number[] = [0, 0];
  chart: Chart;
  timeout1: any;

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
    this.indexDataSub = this.inputDataService.indexDataChanged.subscribe((activeIndex) => {
      this.activeIndex = activeIndex;
    })

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.previewIndexData,
        datasets: [
          {
            label: 'Input',
            data: this.inputData.input,
            backgroundColor: [
              'rgba(54, 162, 235, 0.7)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
            ],
            hoverBackgroundColor: [
              'rgba(255, 159, 64, 0.7)',
            ],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          }
        ]
      },
    }
    );
  }

  previewData() {
    if (this.timeout1) {
      clearTimeout(this.timeout1);
    }
    this.timeout1 = setTimeout(() => {
      this.dataArraySub.unsubscribe();
      this.chart.clear();
    }, 25000);
    this.chart.config.data.labels = this.previewIndexData;
    if (this.activeIndex[0] >= 1 || this.activeIndex[1] >= 1) {
      this.chart.setActiveElements([
        { datasetIndex: 0, index: this.activeIndex[1] },
        { datasetIndex: 0, index: this.activeIndex[0] },
      ])
    }
    this.chart.config.data.datasets[0].data = this.inputData.input;
    this.chart.update();
  }

  ngOnDestroy(): void {
    this.indexDataSub.unsubscribe();
    this.dataArraySub.unsubscribe();
    this.chart.destroy();
  }
}
