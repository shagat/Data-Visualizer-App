import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { InputDataService } from '../start/inputData.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: false }) chartContainer: HTMLElement;
  dataArraySub = new Subscription;

  dataJSONArray: [{ x: number, y: number }] = [{ x: 0, y: 0 }];

  chartOptions = {
    backgroundColor: "#F5DEB3",
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple", y: 10 },
        { label: "Orange", y: 15 },
        { label: "Banana", y: 25 },
        { label: "Mango", y: 30 },
        { label: "Grape", y: 28 }
      ]
      // dataPoints: this.dataJSONArray
    }
    ]
  };

  constructor(private inputDataService: InputDataService) { }

  ngOnInit(): void {
    this.dataArraySub = this.inputDataService.dataJSONArrayChanged.subscribe((dataJSONArray: [{ x: number, y: number }]) => {
      this.dataJSONArray = dataJSONArray;
    }
    )
    var chart = new CanvasJS.Chart("chartContainer", { 
      title: {
        text: "Adding & Updating dataPoints"
      },
      data: [
      {
        type: "bar",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 25 },
          { label: "Mango", y: 30 },
          { label: "Grape", y: 28 }
        ]
      }
      ]
    });
    chart.render();
  }

  getChartInstance(event) {
    // event.chartOptions = {
    //     backgroundColor: "#F5DEB3",
    //     title: {
    //       text: "Basic Column Chart in Angular"
    //     },
    //     data: [{
    //       // type: "column",
    //       type: "column",
    //       dataPoints: [
    //         { label: "Apple", y: 10 },
    //         { label: "Orange", y: 15 },
    //         { label: "Banana", y: 25 },
    //         { label: "Mango", y: 30 },
    //         { label: "Grape", y: 28 }
    //       ]
    //       // dataPoints: this.dataJSONArray
    //     }
    //     ]
    //   };
    // this.chart = event;
  }
  ngOnDestroy(): void {
    this.dataArraySub.unsubscribe();
  }


}
