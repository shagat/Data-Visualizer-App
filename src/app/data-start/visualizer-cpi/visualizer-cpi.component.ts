import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartData, registerables } from 'chart.js';
import { Subscription, tap } from 'rxjs';

import { Data } from '../Data.model';
import { DataService } from '../data.service';
import { DataStartOption } from '../dataStart.model';

@Component({
  selector: 'app-visualizer-cpi',
  templateUrl: './visualizer-cpi.component.html',
  styleUrls: ['./visualizer-cpi.component.css'],
})
export class VisualizerCpiComponent implements OnInit {
  private dataSub = new Subscription();
  private dataStartOptionsSub = new Subscription();

  //Chart Configurations...
  cpi_chart1: Chart;

  ChartOptions1: ChartData;

  chart_1_bgColor: string[] = [
    'rgba(142, 202, 230, 0.7)',
    'rgba(33, 158, 188, 0.7)',
    'rgba(2, 48, 71, 0.7)',
    'rgba(255, 183, 3, 0.7)',
    'rgba(251, 133, 0, 0.7)',
    'rgba(255, 0, 0, 0.7)',
  ];
  chart_2_bgColor: string = 'rgba(255, 0, 0, 0.7)';
  chart_1_borderColor: string = 'rgb(255, 99, 132)';
  chart_2_borderColor: string = 'rgb(255, 99, 132)';

  private data1 = new Data('', '', [], []);

  public dataStartOptions = new DataStartOption(false, false);

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject
      .pipe(
        tap((res) => {
          this.data1 = res[0];
          this.generateChart();
        })
      )
      .subscribe();
    this.dataStartOptionsSub = this.dataService.twoStatesSubject.subscribe(
      (res) => {
        this.dataStartOptions = res;
      }
    );
  }

  async generateChart() {
    if (!this.cpi_chart1) {
      this.createNewChart();
      this.dataService.clearData();
    } else {
      this.cpi_chart1.clear();
      await this.setChartData();
      this.cpi_chart1.update();
      this.clearData();
      this.dataService.clearData();
    }
  }

  createNewChart() {
    //Create a new chart
    this.cpi_chart1 = new Chart('cpi_canvas1', {
      type: 'bar',
      data: {
        labels: this.data1.label,
        datasets: [
          {
            label: this.data1.datasetLabel,
            data: this.data1.data,
            backgroundColor: this.chart_1_bgColor,
            borderColor: [this.chart_1_borderColor],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        //   scales: {
        //     xAxes: [{
        //         ticks: {
        //             autoSkip: false,
        //             maxRotation: 90,
        //             minRotation: 90
        //         }
        //     }]
        // },
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
  }

  async setChartData() {
    this.cpi_chart1.config.data.datasets[0].data = this.data1.data;
    this.cpi_chart1.config.data.datasets[0].label = this.data1.datasetLabel;
    this.cpi_chart1.config.options.plugins.title.text = this.data1.title;
    return;
  }

  clearData() {
    this.data1 = new Data('', '', [], []);
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.dataStartOptionsSub.unsubscribe();
    if (this.cpi_chart1) {
      this.cpi_chart1.destroy();
    }
  }
}
