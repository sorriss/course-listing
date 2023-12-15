import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses', loadComponent: () => import('./pages/courses/courses.component').then(mod => mod.CoursesComponent)
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  }
];
