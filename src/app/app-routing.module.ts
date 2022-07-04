import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SortItemComponent } from './start/sort-start/sort-item/sort-item.component';
import { SortStartComponent } from './start/sort-start/sort-start.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path:'sort-start', component: SortStartComponent},
    {path:'sort-item', component: SortItemComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
