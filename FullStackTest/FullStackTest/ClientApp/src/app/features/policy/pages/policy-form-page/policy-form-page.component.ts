import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Policy } from '../../models/policy.model';
import { PolicyService } from '../../services/policy.service';
import { PolicyFormFieldsComponent } from '../../components/policy-form-fields/policy-form-fields.component';
import { PolicyFormData } from '../../models/form-policy.model';
import { emptyPolicyFormData, mapPolicyToFormData } from '../../mappers/policy.mapper';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';

@Component({
  selector: 'app-policy-form-page',
  imports: [PolicyFormFieldsComponent, RouterLink, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './policy-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  policyService = inject(PolicyService);

  formMode = signal<'create' | 'edit'>('create');
  loading = signal(false);
  notFound = signal(false);
  originalPolicy = signal<Policy | null>(null);

  policyFormData = computed<PolicyFormData>(() => {
    const policy = this.originalPolicy();
    if (policy) {
      return mapPolicyToFormData(policy);
    }
    return emptyPolicyFormData();
  });

  pageSubtitle = computed(() =>
    this.formMode() === 'edit' ? 'Update the policy details and save your changes.'
      : 'Fill in the details below to create a new policy.'
  );

  ngOnInit(): void {
    this.initialiseFormMode();
  }

  // TODO: Implement onSubmit, onReset, and onDelete methods to handle form actions
  handleReset(): void {
  }

  handleDelete(): void {
  }

  handleSubmit(formData: PolicyFormData): void {
  }

  private initialiseFormMode(): void {
    const policyNumber = this.route.snapshot.paramMap.get('policyNumber');

    if (policyNumber && policyNumber.trim() !== 'createPolicy') {
      this.formMode.set('edit');
      this.getPolicy(Number(policyNumber));
    } else {
      this.formMode.set('create');
    }
  }

  private getPolicy(policyNumber: number): void {
    this.loading.set(true);

    this.policyService.getPolicy(policyNumber).pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: policy => {
        this.originalPolicy.set(policy);
        this.loading.set(false);
      },
      error: () => {
        this.notFound.set(true);
        this.loading.set(false);
      }
    });
  }

}
