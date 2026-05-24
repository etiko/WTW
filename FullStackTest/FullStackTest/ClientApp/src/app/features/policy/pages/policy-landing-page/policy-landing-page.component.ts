import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { NoResultComponent } from '@shared/components/no-result/no-result.component';
import { POLICY_ROUTES } from '@shared/constants/routes';

import { PolicyCardComponent } from '../../components/policy-card/policy-card.component';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy.model';
import { Gender } from '../../models/gender.model';

@Component({
  selector: 'app-policy-landing-page',
  imports: [
    PolicyCardComponent, 
    StatsCardComponent, 
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    NoResultComponent,
    RouterLink
  ],
  templateUrl: './policy-landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyLandingPageComponent implements OnInit {
  private policyService = inject(PolicyService);
  private router = inject(Router);

  selectedId = signal<number | null>(null);

  policies = this.policyService.policies;
  loadingState = this.policyService.loadingState;
  error = this.policyService.error;

  totalPolicies = computed(() => this.policies().length);
  femaleCount = computed(() =>
    this.policyService.policies().filter(p => p.policyHolder.gender === Gender.Female).length
  );
  maleCount = computed(() =>
    this.policyService.policies().filter(p => p.policyHolder.gender === Gender.Male).length
  );
  averageHolderAge = computed(() => {
    const policies = this.policies();
    if (policies.length === 0) {
      return 0;
    }
    const totalAge = policies.reduce((sum, policy) => sum + policy.policyHolder.age, 0);
    return Math.round(totalAge / policies.length);
  }); 

  ngOnInit(): void {
    this.policyService.getPolicies();
  }

  handlePolicySelected(policy: Policy): void {
    this.selectedId.set(policy.policyNumber);
    this.router.navigate([`/${POLICY_ROUTES.EDIT}/${policy.policyNumber}`]);
  }

}
