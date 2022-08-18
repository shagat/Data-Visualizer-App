import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModules } from '../shared.modules';
import { DataStartCpiResolver } from './data-start-cpi-resolver';
import { DataStartItemComponent } from './data-start-item/data-start-item.component';
import { DataResolverService } from './data-start-resolver.service';
import { DataStartComponent } from './data-start.component';
import { VisualizerCpiComponent } from './visualizer-cpi/visualizer-cpi.component';
import { VisualizerDataComponent } from './visualizer-data/visualizer-data.component';

@NgModule({
  declarations: [
    DataStartComponent,
    DataStartItemComponent,
    VisualizerDataComponent,
    VisualizerCpiComponent
  ],
  imports: [RouterModule.forChild([
    {path: '', component: DataStartComponent, resolve: [DataResolverService, DataStartCpiResolver]}
  ]), SharedModules],
})
export class DataStartModule {}
