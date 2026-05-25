import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);
  private policyService = inject(PolicyService);
  private router = inject(Router);

  selectedId = signal<number | null>(null);

  readonly policies = this.policyService.policies;
  readonly loadingState = this.policyService.loadingState;
  readonly error = this.policyService.error;

  private readonly stats = computed(() => {
    const policies = this.policies();
    let female = 0, male = 0, totalAge = 0;
    for (const policy of policies) {
      if (policy.policyHolder.gender === Gender.Female) {
        female++;
      }
      else {
        male++;
      }
      totalAge += policy.policyHolder.age;
    }
    return { total: policies.length, female, male, totalAge };
  });

  readonly totalPolicies = computed(() => this.stats().total);
  readonly femaleCount = computed(() => this.stats().female);
  readonly maleCount = computed(() => this.stats().male);
  readonly averageHolderAge = computed(() => {
    const { total, totalAge } = this.stats();
    return total === 0 ? 0 : Math.round(totalAge / total);
  });

  ngOnInit(): void {
    this.policyService.getPolicies()
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  handlePolicySelected(policy: Policy): void {
    this.selectedId.set(policy.policyNumber);
    this.router.navigate([POLICY_ROUTES.EDIT, policy.policyNumber]);
  }

}
