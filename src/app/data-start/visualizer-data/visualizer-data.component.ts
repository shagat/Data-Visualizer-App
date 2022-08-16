import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { Subscription, tap } from 'rxjs';

import { Data } from '../Data.model';
import { DataService } from '../data.service';
import { DataStartOption } from '../dataStart.model';
@Component({
  selector: 'app-visualizer-data',
  templateUrl: './visualizer-data.component.html',
  styleUrls: ['./visualizer-data.component.css'],
})
export class VisualizerDataComponent implements OnInit, OnDestroy {
  private dataSub = new Subscription();
  private dataStartOptionsSub = new Subscription();

  //Chart Configurations...
  data_chart1: Chart;
  data_chart2: Chart;
  ChartOptions1: ChartData;
  ChartOptions2: ChartData;
  chart_1_bgColor: string = 'rgba(0, 255, 0, 0.7)';
  chart_2_bgColor: string = 'rgba(255, 0, 0, 0.7)';
  chart_1_borderColor: string = 'rgb(255, 99, 132)';
  chart_2_borderColor: string = 'rgb(255, 99, 132)';

  private data1 = new Data('', '', [], []);
  private data2 = new Data('', '', [], []);
  private secData1 = new Data('', '', [], []);
  private secData2 = new Data('', '', [], []);
  public dataStartOptions = new DataStartOption(false, false);

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject
      .pipe(
        tap((res) => {
          // console.log(res);
          this.data1 = res[0];
          this.data2 = res[1];
          this.secData1 = res[2];
          this.secData2 = res[3];
          console.log(res);
          this.generateChart();
        })
      )
      .subscribe();
    this.dataStartOptionsSub = this.dataService.twoStatesSubject.subscribe(
      (twores) => {
        this.dataStartOptions = twores;
      }
    );
  }

  async generateChart() {
    if (!this.data_chart1) {
      this.createNewChart();
      this.dataService.clearData();
    } else {
      this.data_chart1.clear();
      this.data_chart2.clear();
      await this.setChartData();
      this.data_chart1.update();
      this.data_chart2.update();
      this.clearData();
      this.dataService.clearData();
    }
  }

  createNewChart() {
    // if(this.dataStartOptions.optionCPI){
    //     console.log('2 Charts generated for GSDP');
    //     this.ChartOptions1 = {
    //       labels: this.data1.label,
    //       datasets: [
    //         {
    //           label: 'some label',
    //           data: this.data1.data,
    //         },
    //         // {
    //         //   label: this.secData1.datasetLabel,
    //         //   data: this.secData1.data,
    //         // },
    //       ],
    //     };
    // }
    if (this.dataStartOptions.twoStates) {
      console.log('2 Charts generated for GSDP');
      this.ChartOptions1 = {
        labels: this.data1.label,
        datasets: [
          {
            label: this.data1.datasetLabel,
            data: this.data1.data,
          },
          {
            label: this.secData1.datasetLabel,
            data: this.secData1.data,
          },
        ],
      };
      this.ChartOptions2 = {
        labels: this.data2.label,
        datasets: [
          {
            label: this.data2.datasetLabel,
            data: this.data2.data,
          },
          {
            label: this.secData2.datasetLabel,
            data: this.secData2.data,
          },
        ],
      };
    } else {
      console.log('new Chart generated for GSDP');
      this.ChartOptions1 = {
        labels: this.data1.label,
        datasets: [
          {
            label: this.data1.datasetLabel,
            data: this.data1.data,
          },
        ],
      };

      this.ChartOptions2 = {
        labels: this.data2.label,
        datasets: [
          {
            label: this.data2.datasetLabel,
            data: this.data2.data,
          },
        ],
      };
    }
    //Create a new chart
    this.data_chart1 = new Chart('data_canvas1', {
      type: 'line',
      data: {
        labels: this.data2.label,
        datasets: [
          {
            label: this.data1.datasetLabel,
            data: this.data1.data,
            backgroundColor: [this.chart_1_bgColor],
            borderColor: [this.chart_1_borderColor],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
            order: 1,
          },
          {
            label: this.secData1.datasetLabel,
            data: this.secData1.data,
            backgroundColor: [this.chart_2_bgColor],
            borderColor: [this.chart_2_borderColor],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
            order: 0,
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
            backgroundColor: [this.chart_1_bgColor],
            borderColor: [this.chart_1_borderColor],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
            order: 1,
          },
          {
            label: this.secData2.datasetLabel,
            data: this.secData2.data,
            backgroundColor: [this.chart_2_bgColor],
            borderColor: [this.chart_2_borderColor],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
            order: 0,
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

  async setChartData() {
    if (this.dataStartOptions.twoStates) {
      //For Chart 1:--
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart1.config.data.datasets[0].data = this.data1.data;
      this.data_chart1.config.data.datasets[1].data = this.secData1.data;
      this.data_chart2.config.data.datasets[1].data = this.secData2.data;
      this.data_chart1.config.data.datasets[1].label =
        this.secData1.datasetLabel;
      this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart2.config.data.datasets[0].data = this.data2.data;
      this.data_chart2.config.data.datasets[1].data = this.secData2.data;
      this.data_chart2.config.data.datasets[1].label =
        this.secData2.datasetLabel;
      this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
      this.data_chart2.config.data.datasets[0].label = this.data2.datasetLabel;
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart2.config.options.plugins.title.text = this.data2.title;
    } else {
      //...Clear the second Chart when loading the first Chart
      this.data_chart1.config.data.datasets[1].data = [];
      this.data_chart2.config.data.datasets[1].data = [];
      this.data_chart1.config.data.datasets[1].label = '';
      this.data_chart2.config.data.datasets[1].data = [];
      this.data_chart2.config.data.datasets[1].label = '';
      //...

      this.data_chart1.config.data.datasets[0].data = this.data1.data;
      this.data_chart2.config.data.datasets[0].data = this.data2.data;

      this.data_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
      this.data_chart2.config.data.datasets[0].label = this.data2.datasetLabel;
      this.data_chart1.config.options.plugins.title.text = this.data1.title;
      this.data_chart2.config.options.plugins.title.text = this.data2.title;
    }
    return;
  }

  clearData() {
    this.data1 = new Data('', '', [], []);
    this.data2 = new Data('', '', [], []);
    this.secData1 = new Data('', '', [], []);
    this.secData2 = new Data('', '', [], []);
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.dataStartOptionsSub.unsubscribe();
    if (this.data_chart1) {
      this.data_chart1.destroy();
      this.data_chart2.destroy();
    }
  }
}
