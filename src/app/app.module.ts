import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as CanvasAngularCharts from '../assets/canvasjs.angular.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

var CanvasJSChart = CanvasAngularCharts.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
