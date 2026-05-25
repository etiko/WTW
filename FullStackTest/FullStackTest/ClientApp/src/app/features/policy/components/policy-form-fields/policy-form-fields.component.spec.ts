import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

import { PolicyFormFieldsComponent } from './policy-form-fields.component';
import { Gender } from '../../models/gender.model';

@Component({ selector: 'app-confirm-modal', template: '', standalone: true })
class MockConfirmModalComponent {
  show = jest.fn();
  hide = jest.fn();
}

describe('PolicyFormFieldsComponent', () => {
  let component: PolicyFormFieldsComponent;
  let fixture: ComponentFixture<PolicyFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyFormFieldsComponent],
    })
      .overrideComponent(PolicyFormFieldsComponent, {
        remove: { imports: [ConfirmModalComponent] },
        add: { imports: [MockConfirmModalComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(PolicyFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form is invalid when empty', () => {
    expect(component.policyForm.invalid).toBe(true);
  });

  it('form is valid when all required fields are filled', () => {
    component.policyForm.setValue({
      policyNumber: 1001,
      policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
    });
    expect(component.policyForm.valid).toBe(true);
  });

  it('hasError returns false when control is pristine', () => {
    expect(component.hasError(component.policyForm.controls.policyNumber)).toBe(false);
  });

  it('hasError returns true when control is touched and invalid', () => {
    component.policyForm.controls.policyNumber.markAsTouched();
    expect(component.hasError(component.policyForm.controls.policyNumber)).toBe(true);
  });

  it('onFormSubmit marks all touched and does not emit when form is invalid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.onFormSubmit();
    expect(component.policyForm.touched).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('onFormSubmit emits raw form value when valid', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.policyForm.setValue({
      policyNumber: 1001,
      policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
    });
    component.onFormSubmit();
    expect(emitSpy).toHaveBeenCalledWith(expect.objectContaining({ policyNumber: 1001 }));
  });

  it('onFormReset resets the form to empty values', () => {
    component.policyForm.setValue({
      policyNumber: 1001,
      policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
    });
    component.onFormReset();
    expect(component.policyForm.value.policyNumber).toBeNull();
  });

  it('confirmDelete emits formDelete', () => {
    const emitSpy = jest.spyOn(component.formDelete, 'emit');
    component.confirmDelete();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('policyNumber is disabled when editing input is true', () => {
    fixture.componentRef.setInput('editing', true);
    fixture.detectChanges();
    expect(component.policyForm.controls.policyNumber.disabled).toBe(true);
  });

  it('policyNumber is enabled when editing input is false', () => {
    fixture.componentRef.setInput('editing', false);
    fixture.detectChanges();
    expect(component.policyForm.controls.policyNumber.enabled).toBe(true);
  });
});
