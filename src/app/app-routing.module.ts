import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './data-start/data-start-resolver.service';
import { DataStartComponent } from './data-start/data-start.component';
import { HomeComponent } from './home/home.component';

import { TemperatureChangeStartComponent } from './temperature-change-start/temperature-change-start.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'data-start',
    component: DataStartComponent,
    resolve: [DataResolverService],
  },
  {
    path: 'temp-start',
    component: TemperatureChangeStartComponent,
  },
  {
    path: 'sort-start',
    loadChildren: () =>
      import('./sort-start/sorting.module').then((m) => m.SortingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
