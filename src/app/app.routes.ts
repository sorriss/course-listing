import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/courses/courses.component').then(
        (component) => component.CoursesComponent
      ),
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/detail/detail.component').then(
        (component) => component.DetailComponent
      ),
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
];
