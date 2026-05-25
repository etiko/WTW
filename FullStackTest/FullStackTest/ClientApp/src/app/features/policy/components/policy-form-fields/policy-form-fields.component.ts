import { ChangeDetectionStrategy, Component, effect, input, output, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

import { Gender, GENDER_OPTIONS } from '../../models/gender.model';
import { PolicyFormData } from '../../models/form-policy.model';
import { emptyPolicyFormData } from '../../mappers/policy.mapper';

@Component({
  selector: 'app-policy-form-fields',
  imports: [ReactiveFormsModule, ConfirmModalComponent],
  templateUrl: './policy-form-fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyFormFieldsComponent {
  initialPolicyFormData = input<PolicyFormData | null>(null);
  editing = input(false);
  disabled = input(false);
  genderOptions = GENDER_OPTIONS;
  formSubmit = output<PolicyFormData>();
  formReset = output<void>();
  formDelete = output<void>();

  private deleteModal = viewChild(ConfirmModalComponent);

  policyForm = new FormGroup({
    policyNumber: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    policyHolder: new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(120)]),
      gender: new FormControl<Gender | null>(null, [Validators.required])
    })
  });

  constructor() {
    effect(() => {
      const data = this.initialPolicyFormData();
      if (data) {
        this.policyForm.setValue(data, { emitEvent: false });
      }
      if (this.editing()) {
        this.policyForm.controls.policyNumber.disable();
      } else {
        this.policyForm.controls.policyNumber.enable();
      }
    });
  }

  get holderGroup() {
    return this.policyForm.controls.policyHolder;
  }

  hasError(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onFormSubmit(): void {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }

    const policyFormData = this.policyForm.getRawValue();
    this.formSubmit.emit(policyFormData);
  }

  onFormReset(): void {
    this.policyForm.reset(emptyPolicyFormData());
  }

  onDelete(): void {
    this.deleteModal()?.show();
  }

  confirmDelete(): void {
    this.formDelete.emit();
  }
}
