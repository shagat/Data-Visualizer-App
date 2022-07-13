import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SortItemComponent } from './start/sort-start/sort-item/sort-item.component';
import { SortStartComponent } from './start/sort-start/sort-start.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path:'sort-item', component: SortItemComponent},
  ]},
  {path:':id/sort-start', component: SortStartComponent},
  {path:'viz', component: VisualizerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
