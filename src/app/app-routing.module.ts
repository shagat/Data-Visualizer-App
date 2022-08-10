import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'data-start',
    loadChildren: () =>
      import('./data-start/data-start-module').then((m) => m.DataStartModule),
  },
  {
    path: 'temp-start',
    // component: TemperatureChangeStartComponent,
    redirectTo: 'page-not-found',
  },
  {
    path: 'sort-start',
    loadChildren: () =>
      import('./sort-start/sorting.module').then((m) => m.SortingModule),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
