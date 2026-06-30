import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../models/nav-item.model';
import { POLICY_ROUTES } from '@shared/constants/routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly navItems: NavItem[] = [
    { path: `/${POLICY_ROUTES.ROOT}`, label: 'Policies', icon: 'bi-file-earmark-text' },
    { path: `/${POLICY_ROUTES.CREATE}`, label: 'Create Policy', icon: 'bi-plus-circle' },
  ];
}
