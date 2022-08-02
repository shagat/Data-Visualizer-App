import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Data } from '../Data.model';
import { DataService } from '../data.service';
@Component({
  selector: 'app-visualizer-data',
  templateUrl: './visualizer-data.component.html',
  styleUrls: ['./visualizer-data.component.css'],
})
export class VisualizerDataComponent implements OnInit {
  data_chart1: Chart;
  data_chart2: Chart;
  data1 = new Data('', '', ['1', '2', '3', '4'], [23, 12, 123, 123]);
  data2 = new Data('', '', ['1', '2', '3', '4'], [23, 12, 123, 123]);

  dataSub = new Subscription();

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      this.data1 = res[0];
      this.data2 = res[1];
    });
  }
  generateChart() {
    if (!this.data_chart1) {
      this.createNewChart();
    } else {
      // this.data_chart1.clear();
      this.data_chart1.update();
      // this.data_chart2.update();
    }
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
}
