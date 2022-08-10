import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModules } from './shared.modules';
import { TemperatureChangeStartComponent } from './temperature-change-start/temperature-change-start.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TemperatureChangeItemComponent } from './temperature-change-start/temperature-change-item/temperature-change-item.component';
import { HttpClientModule } from '@angular/common/http';
import { DataStartComponent } from './data-start/data-start.component';
import { DataStartItemComponent } from './data-start/data-start-item/data-start-item.component';
import { VisualizerDataComponent } from './data-start/visualizer-data/visualizer-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TemperatureChangeStartComponent,
    TemperatureChangeItemComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModules,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
