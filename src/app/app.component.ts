import { Component, OnInit } from '@angular/core';
import { reduce } from 'rxjs';

import { bubbleData } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'algorithm-app';
  chartOptions = {
    backgroundColor: "#F5DEB3",
    // theme: "dark1",
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Apple",  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ]
    }
  ]
			  
  };

  constructor() {}

  ngOnInit(): void {}
}
