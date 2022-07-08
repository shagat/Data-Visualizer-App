import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  chartOptions = {
    backgroundColor: "#F5DEB3",
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      // type: "column",
      type: "pie",
      dataPoints: [
        { label: "Apple", y: 10 },
        { label: "Orange", y: 15 },
        { label: "Banana", y: 25 },
        { label: "Mango", y: 30 },
        { label: "Grape", y: 28 }
      ]
    }
    ]

  };
}
