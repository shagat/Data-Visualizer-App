import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SortItemComponent } from './start/sort-start/sort-item/sort-item.component';
import { SortStartComponent } from './start/sort-start/sort-start.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path:'sort-item', component: SortItemComponent},
  ]},
  {path:':id/sort-start', component: SortStartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
