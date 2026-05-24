import { Routes } from '@angular/router';
import { POLICY_ROUTES } from './shared/constants/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: POLICY_ROUTES.ROOT,
    pathMatch: 'full'
  },
  {
    path: POLICY_ROUTES.ROOT,
    loadComponent: () =>
      import('./features/policy/pages/policy-landing-page/policy-landing-page.component')
        .then(component => component.PolicyLandingPageComponent)
  },
  {
    path: POLICY_ROUTES.CREATE,
    loadComponent: () =>
      import('./features/policy/pages/policy-form-page/policy-form-page.component')
        .then(component => component.PolicyFormPageComponent)
  },
  {
    path: `${POLICY_ROUTES.EDIT}/:policyNumber`,
    loadComponent: () =>
      import('./features/policy/pages/policy-form-page/policy-form-page.component')
        .then(component => component.PolicyFormPageComponent)
  },
  {
    path: '**',
    redirectTo: POLICY_ROUTES.ROOT
  }
];