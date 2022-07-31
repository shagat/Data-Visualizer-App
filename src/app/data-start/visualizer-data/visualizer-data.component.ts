import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
@Component({
  selector: 'app-visualizer-data',
  templateUrl: './visualizer-data.component.html',
  styleUrls: ['./visualizer-data.component.css']
})
export class VisualizerDataComponent implements OnInit {
  chart: Chart;
  previewIndexData = [1,2,3,4,5,6,7,8,9,10]
  inputData = [23,12,123,123,12,312,3,123,12,313]
  dataSub = new Subscription;

  constructor(private dataService: DataService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.dataSub = this.dataService.dataSubject.subscribe((res) => {
      console.log(res +'from visualizer');
    })
    this.createNewChart()
  }
  createNewChart() {
    this.chart = new Chart('data_canvas', {
      type: 'bar',
      data: {
        labels: this.previewIndexData,
        datasets: [
          {
            label: 'Input',
            data: this.inputData,
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
}
