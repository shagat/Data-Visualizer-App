import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputDataService } from '../sort-start/inputData.service'; 
import { InputData } from '../sort-start/InputData.model'; 
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  private dataArraySub = new Subscription;
  private indexDataSub = new Subscription;
  @Output('noChart') noChart = new EventEmitter<boolean>();
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


  }

  previewData() {

    if (this.timeout1) {
      clearTimeout(this.timeout1);
    }
    this.timeout1 = setTimeout(() => {
      this.chart.clear();
      this.chart.destroy();
      this.chart = null;
      this.noChart.emit(!this.chart);
    }, 22000);

    if (!this.chart) {
      this.createNewChart();
    }

    this.chart.config.data.labels = this.previewIndexData;
    if (this.activeIndex[0] >= 1 && this.activeIndex[1] >= 1) {
      this.chart.setActiveElements([
        { datasetIndex: 0, index: this.activeIndex[1] },
        { datasetIndex: 0, index: this.activeIndex[0] },
      ])
    }
    this.chart.config.data.datasets[0].data = this.inputData.input;
    // console.log('update: ' + !this.chart);
    this.chart.update();
  }

  createNewChart() {
    this.noChart.emit(!this.noChart);
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

  ngOnDestroy(): void {
    this.indexDataSub.unsubscribe();
    this.dataArraySub.unsubscribe();
    if (this.chart){
      this.chart.destroy();
    }
  }
}
