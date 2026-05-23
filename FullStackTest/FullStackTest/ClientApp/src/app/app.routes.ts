import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'policies',
    pathMatch: 'full'
  },
  {
    path: 'policies',
    loadComponent: () =>
      import('./features/policy/pages/policy-landing-page/policy-landing-page.component')
        .then(component => component.PolicyLandingPageComponent)
  },
  {
    path: 'policies/createPolicy',
    loadComponent: () =>
      import('./features/policy/pages/policy-form-page/policy-form-page.component')
        .then(component => component.PolicyFormPageComponent)
  },
  {
    path: 'policies/editPolicy/:policyNumber',
    loadComponent: () =>
      import('./features/policy/pages/policy-form-page/policy-form-page.component')
        .then(component => component.PolicyFormPageComponent)
  },
  {
    path: '**',
    redirectTo: 'policies'
  }
];