import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModules } from '../shared.modules';
import { DataStartItemComponent } from './data-start-item/data-start-item.component';
import { DataResolverService } from './data-start-resolver.service';
import { DataStartComponent } from './data-start.component';
import { VisualizerDataComponent } from './visualizer-data/visualizer-data.component';

@NgModule({
  declarations: [
    DataStartComponent,
    DataStartItemComponent,
    VisualizerDataComponent,
  ],
  imports: [RouterModule.forChild([
    {path: '', component: DataStartComponent, resolve: [DataResolverService]}
  ]), SharedModules],
})
export class DataStartModule {}
