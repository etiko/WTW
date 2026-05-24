import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Gender, GENDER_OPTIONS } from '../../models/gender.model';
import { PolicyFormData } from '../../models/form-policy.model';
import { emptyPolicyFormData } from '../../mappers/policy.mapper';

@Component({
  selector: 'app-policy-form-fields',
  imports: [ReactiveFormsModule],
  templateUrl: './policy-form-fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyFormFieldsComponent implements OnInit {
  initialPolicyFormData = input<PolicyFormData | null>(null);
  editing = input(false);
  disabled = input(false);
  genderOptions = GENDER_OPTIONS;
  formSubmit = output<PolicyFormData>();
  formReset = output<void>();
  formDelete = output<void>();

  policyForm = new FormGroup({
    policyNumber: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    policyHolder: new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(120)]),
      gender: new FormControl<Gender | null>(null, [Validators.required])
    })
  });

  ngOnInit(): void {
    const data = this.initialPolicyFormData();
    if (data) {
      this.policyForm.setValue(data, { emitEvent: false });
    }
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
    }

    const policyFormData = this.policyForm.getRawValue();
    this.formSubmit.emit(policyFormData);
  }

  onFormReset(): void {
    this.policyForm.reset(emptyPolicyFormData());
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
      this.formDelete.emit();
    }
  }
}
