import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DestroyRef } from '@angular/core';

import { PolicyService } from './policy.service';
import { Policy } from '../models/policy.model';
import { Gender } from '../models/gender.model';
import { PolicyFormData } from '../models/form-policy.model';

const mockPolicy: Policy = {
  policyNumber: 1001,
  policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
};

const fakeDestroyRef = {
  onDestroy: jest.fn().mockReturnValue(() => {}),
} as unknown as DestroyRef;

describe('PolicyService', () => {
  let service: PolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PolicyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPolicies', () => {
    it('sets loadingState to loading then success with policies', () => {
      service.getPolicies(fakeDestroyRef);
      expect(service.loadingState()).toBe('loading');

      httpMock.expectOne('/api/policy').flush([mockPolicy]);

      expect(service.loadingState()).toBe('success');
      expect(service.policies()).toEqual([mockPolicy]);
    });

    it('sets error state on HTTP failure', () => {
      service.getPolicies(fakeDestroyRef);
      httpMock.expectOne('/api/policy').flush('error', { status: 500, statusText: 'Server Error' });

      expect(service.loadingState()).toBe('error');
      expect(service.error()).toBeTruthy();
    });
  });

  describe('createPolicy', () => {
    it('appends the new policy to state on success', () => {
      const formData: PolicyFormData = {
        policyNumber: 1001,
        policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
      };
      service.createPolicy(formData).subscribe();
      httpMock.expectOne('/api/policy').flush(mockPolicy);

      expect(service.policies()).toContainEqual(mockPolicy);
      expect(service.submitting()).toBe(false);
    });

    it('sets error message on conflict (409)', () => {
      const formData: PolicyFormData = {
        policyNumber: 1001,
        policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
      };
      service.createPolicy(formData).subscribe({ error: () => {} });
      httpMock.expectOne('/api/policy').flush('error', { status: 409, statusText: 'Conflict' });

      expect(service.error()).toBe('A policy with this number already exists.');
    });
  });

  describe('updatePolicy', () => {
    it('replaces the updated policy in state', () => {
      service.getPolicies(fakeDestroyRef);
      httpMock.expectOne('/api/policy').flush([mockPolicy]);

      const updated = { ...mockPolicy, policyHolder: { ...mockPolicy.policyHolder, name: 'Alice Updated' } };
      service.updatePolicy(1001, updated).subscribe();
      httpMock.expectOne('/api/policy/1001').flush(updated);

      expect(service.policies().find(p => p.policyNumber === 1001)?.policyHolder.name).toBe('Alice Updated');
    });
  });

  describe('deletePolicy', () => {
    it('removes the deleted policy from state', () => {
      service.getPolicies(fakeDestroyRef);
      httpMock.expectOne('/api/policy').flush([mockPolicy]);

      service.deletePolicy(1001).subscribe();
      httpMock.expectOne('/api/policy/1001').flush(null);

      expect(service.policies().find(p => p.policyNumber === 1001)).toBeUndefined();
    });
  });
});
