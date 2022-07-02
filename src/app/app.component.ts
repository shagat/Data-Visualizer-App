import { Component, OnInit } from '@angular/core';
import { bubbleData } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'algorithm-app';
  // bubbleData: any[] = [];
  // view: [number, number] = [700,400];

  // options
  // showXAxis: boolean = true;
  // showYAxis: boolean = true;
  // gradient: boolean = false;
  // showLegend: boolean = true;
  // showXAxisLabel: boolean = true;
  // yAxisLabel: string = 'Population';
  // showYAxisLabel: boolean = true;
  // xAxisLabel: string = 'Years';
  // maxRadius: number = 20;
  // minRadius: number = 5;
  // xScaleMin: number = 70;
  // xScaleMax: number = 70;
  // yScaleMin: number = 70;
  // yScaleMax: number = 85;

  // colorScheme = '#5AA454';
  // colorScheme = {
  //   domain:
  //    ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {
    // Object.assign(this, { bubbleData });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // onSelect(data: any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data: any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data: any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
