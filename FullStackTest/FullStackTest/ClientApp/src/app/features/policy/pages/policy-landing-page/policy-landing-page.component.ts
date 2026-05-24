import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);

  selectedId = signal<number | null>(null);

  policies = this.policyService.policies;
  loadingState = this.policyService.loadingState;
  error = this.policyService.error;

  private stats = computed(() => {
    const policies = this.policies();
    let female = 0, male = 0, totalAge = 0;
    for (const p of policies) {
      if (p.policyHolder.gender === Gender.Female) {
        female++;
      }
      else {
        male++;
      }
      totalAge += p.policyHolder.age;
    }
    return { total: policies.length, female, male, totalAge };
  });

  totalPolicies = computed(() => this.stats().total);
  femaleCount = computed(() => this.stats().female);
  maleCount = computed(() => this.stats().male);
  averageHolderAge = computed(() => {
    const { total, totalAge } = this.stats();
    return total === 0 ? 0 : Math.round(totalAge / total);
  });

  ngOnInit(): void {
    this.policyService.getPolicies(this.destroyRef);
  }

  handlePolicySelected(policy: Policy): void {
    this.selectedId.set(policy.policyNumber);
    this.router.navigate([`/${POLICY_ROUTES.EDIT}/${policy.policyNumber}`]);
  }

}
