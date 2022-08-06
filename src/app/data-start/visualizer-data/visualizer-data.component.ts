import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { Subscription, tap } from 'rxjs';

import { Data } from '../Data.model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-visualizer-data',
  templateUrl: './visualizer-data.component.html',
  styleUrls: ['./visualizer-data.component.css'],
})
export class VisualizerDataComponent implements OnInit, OnDestroy {
  private dataSub = new Subscription();
  private twoDataSub = new Subscription();
  data_chart1: Chart;
  data_chart2: Chart;

  private data1 = new Data('', '', [], []);
  private data2 = new Data('', '', [], []);
  private secData1 = new Data('', '', [], []);
  private secData2 = new Data('', '', [], []);
  private twoStates: boolean = false;

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject
      .pipe(
        tap((res) => {
          this.data1 = res[0];
          this.data2 = res[1];
          this.secData1 = res[2];
          this.secData2 = res[3];
          this.generateChart();
        })
      )
      .subscribe();
    this.twoDataSub = this.dataService.twoStatesSubject.subscribe((twores) => {
      this.twoStates = twores;
    });
  }

  async generateChart() {
    if (!this.data_chart1) {
      this.createNewChart();
      this.dataService.clearData();
    } else {
      await this.setChartData();
      this.data_chart1.update();
      this.data_chart2.update();
      this.dataService.clearData();
    }
  }

  createNewChart() {
    let ChartOptions1: ChartData;
    let ChartOptions2: ChartData;

    if (this.twoStates) {
      console.log('new 2 Charts generated')
      let ChartOptions1 = {
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
          {
            label: this.secData1.datasetLabel,
            data: this.secData1.data,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          },
        ],
      };
      ChartOptions2 = {
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
          {
            label: this.secData2.datasetLabel,
            data: this.secData2.data,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          },
        ],
      };
    } else {
      console.log('new Chart generated')
      ChartOptions1 = {
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
      };

      ChartOptions2 = {
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
      };
    }

    this.data_chart1 = new Chart('data_canvas1', {
      type: 'line',
      data: ChartOptions1,
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
      data: ChartOptions2,
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

  async setChartData() {
    if(this.twoStates){
      this.data_chart1.config.data.datasets[0].data = this.data1.data;
      this.data_chart2.config.data.datasets[0].data = this.data2.data;
      this.data_chart1.config.data.datasets[0].data = this.secData1.data;
      this.data_chart2.config.data.datasets[0].data = this.secData2.data;
      this.data_chart1.config.data.datasets[0].label = this.secData1.datasetLabel;
      this.data_chart2.config.data.datasets[0].label = this.secData2.datasetLabel;
      this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
      this.data_chart2.config.data.datasets[0].label = this.data2.datasetLabel;
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart2.config.options.plugins.title.text = this.data2.title;

    }else {
      this.data_chart1.config.data.datasets[0].data = this.data1.data;
      this.data_chart2.config.data.datasets[0].data = this.data2.data;
      this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
      this.data_chart2.config.data.datasets[0].label = this.data2.datasetLabel;
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart2.config.options.plugins.title.text = this.data2.title;

    }
    return
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
