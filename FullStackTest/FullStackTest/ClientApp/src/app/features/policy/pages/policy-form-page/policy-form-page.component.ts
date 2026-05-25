import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { POLICY_ROUTES } from '@shared/constants/routes';

import { Policy } from '../../models/policy.model';
import { PolicyService } from '../../services/policy.service';
import { PolicyFormFieldsComponent } from '../../components/policy-form-fields/policy-form-fields.component';
import { emptyPolicyFormData, mapFormDataToPolicy, mapPolicyToFormData } from '../../mappers/policy.mapper';
import { Feedback, FORM_MODES, FormMode, PolicyFormData } from '../../models/form-policy.model';


@Component({
  selector: 'app-policy-form-page',
  imports: [
    PolicyFormFieldsComponent,
    RouterLink, 
    LoadingSpinnerComponent, 
    ErrorMessageComponent
  ],
  templateUrl: './policy-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  policyService = inject(PolicyService);

  private readonly formFields = viewChild(PolicyFormFieldsComponent);

  formMode = signal<FormMode>(FORM_MODES.CREATE);
  loading = signal(false);
  notFound = signal(false);
  originalPolicy = signal<Policy | null>(null);
  feedback = signal<Feedback | null>(null);

  readonly policyFormData = computed<PolicyFormData>(() => {
    const policy = this.originalPolicy();
    if (policy) {
      return mapPolicyToFormData(policy);
    }
    return emptyPolicyFormData();
  });

  readonly pageSubtitle = computed(() =>
    this.formMode() === FORM_MODES.EDIT ? 'Update the policy details and save your changes.'
      : 'Fill in the details below to create a new policy.'
  );

  ngOnInit(): void {
    this.initializeFormMode();
  }

  handleSubmit(formData: PolicyFormData): void {
    this.feedback.set(null);
    if (this.formMode() === FORM_MODES.CREATE) {
      this.createPolicy(formData);
    } else {
      this.updatePolicy(formData);
    }
  }

  handleReset(): void {
    this.feedback.set(null);
  }

  handleDelete(): void {
    const policyNumber = this.originalPolicy()?.policyNumber;
    if (!policyNumber) {
      return;
    }

    this.policyService.deletePolicy(policyNumber).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate([POLICY_ROUTES.ROOT]),
        error: () => this.feedback.set({ type: 'error', message: this.policyService.error() ?? 'Failed to delete policy.' })
      });
  }

  private createPolicy(formData: PolicyFormData): void {
    this.policyService.createPolicy(formData).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.feedback.set({ type: 'success', message: 'Policy created successfully.' });
          this.formFields()?.resetForm();
        },
        error: () => {
          this.feedback.set({ type: 'error', message: this.policyService.error() ?? 'Failed to create policy.' });
        }
      });
  }

  private updatePolicy(formData: PolicyFormData): void {
    const policyNumber = this.originalPolicy()!.policyNumber;
    const policy = mapFormDataToPolicy(formData, policyNumber);

    this.policyService.updatePolicy(policyNumber, policy).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: updatedPolicy => {
          this.feedback.set({ type: 'success', message: 'Policy updated successfully.' });  
          this.originalPolicy.set(updatedPolicy);
        },
        error: () => {
          this.feedback.set({ type: 'error', message: this.policyService.error() ?? 'Failed to update policy.' });
        }
      });
  }

  private initializeFormMode(): void {
    const policyNumber = this.route.snapshot.paramMap.get('policyNumber');

    if (policyNumber && policyNumber.trim() !== 'createPolicy') {
      this.formMode.set(FORM_MODES.EDIT);
      this.getPolicy(Number(policyNumber));
    } else {
      this.formMode.set(FORM_MODES.CREATE);
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
