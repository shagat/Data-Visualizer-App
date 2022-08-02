import { Component, OnInit } from '@angular/core';
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
  data_chart: Chart;
  data = new Data(
    'title',
    '',
    ['1', '2', '3', '4'],
    [23, 12, 123, 123]
  );

  dataSub = new Subscription();

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      this.data = res;
      // this.chart.update();
    });
  }
  generateChart() {
    if (!this.data_chart) {
      this.createNewChart();
    } else {
      this.data_chart.clear();
      this.data_chart.update();
    }
  }
  createNewChart() {
    this.data_chart = new Chart('data_canvas', {
      type: 'line',
      data: {
        labels: this.data.label,
        datasets: [
          {
            label: this.data.datasetLabel,
            data: this.data.data,
            backgroundColor: ['rgba(54, 162, 235, 0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            hoverBackgroundColor: ['rgba(255, 159, 64, 0.7)'],
            hoverBorderWidth: 1.5,
            borderWidth: 1,
          },
        ],
      },
      options:{
        responsive: true,
        plugins:{
          legend:{
            position:'top'
          },
          title:{
            display:true,
            text:this.data.title
          }
        }
      }
    });
  }
}
