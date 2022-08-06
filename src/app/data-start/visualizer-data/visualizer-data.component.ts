import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

import { Data } from '../Data.model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-visualizer-data',
  templateUrl: './visualizer-data.component.html',
  styleUrls: ['./visualizer-data.component.css'],
})
export class VisualizerDataComponent implements OnInit, OnDestroy {
  private twoStates: boolean = false;
  data_chart1: Chart;
  data_chart2: Chart;
  data1 = new Data('', '', [], []);
  data2 = new Data('', '', [], []);

  private dataSub = new Subscription();
  private twoDataSub = new Subscription();

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      console.log(res.length);
      this.data1 = res[0];
      this.data2 = res[1];
      // this.generateChart();
    });
    this.twoDataSub = this.dataService.twoStatesSubject.subscribe((twores) => {
      this.twoStates = twores;
    });
  }

  generateChart() {
    if (!this.data_chart1) {
      console.log('Generate If');
      this.createNewChart();
      this.dataService.clearData();
    } else {
      console.log('Generate Else');
      this.setChartData();
      this.data_chart1.update();
      this.data_chart2.update();
      this.dataService.clearData();
    }
  }

  setChartData() {
    this.data_chart1.config.data.datasets[0].data = this.data1.data;
    this.data_chart2.config.data.datasets[0].data = this.data2.data;
    this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
    this.data_chart2.config.data.datasets[0].label = this.data2.datasetLabel;
    this.data_chart1.config.options.plugins.title.text = this.data1.title;
    this.data_chart2.config.options.plugins.title.text = this.data2.title;
  }

  createNewChart() {
    this.data_chart1 = new Chart('data_canvas1', {
      type: 'line',
      data: {
        labels: this.data1.label,
        datasets: [
          {
            label: this.data1.datasetLabel,
            data: this.data1.data,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.data1.title,
          },
        },
      },
    });
    //..Another Chart
    this.data_chart2 = new Chart('data_canvas2', {
      type: 'line',
      data: {
        labels: this.data2.label,
        datasets: [
          {
            label: this.data2.datasetLabel,
            data: this.data2.data,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.data2.title,
          },
        },
      },
    });
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.twoDataSub.unsubscribe();
    if (this.data_chart1) {
      this.data_chart1.destroy();
      this.data_chart2.destroy();
    }
  }
}
