import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as CanvasAngularCharts from '../assets/canvasjs.angular.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { SortItemComponent } from './start/sort-start/sort-item/sort-item.component';
import { HeaderComponent } from './header/header.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialsModule } from 'src/materials.modules';
import { SortStartComponent } from './start/sort-start/sort-start.component';

var CanvasJSChart = CanvasAngularCharts.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    CanvasJSChart,
    HomeComponent,
    StartComponent,
    SortItemComponent,
    SortStartComponent,
    HeaderComponent,
    VisualizerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
