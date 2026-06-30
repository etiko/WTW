import { Gender } from '../models/gender.model';
import { PolicyFormData } from '../models/form-policy.model';
import { Policy } from '../models/policy.model';
import { emptyPolicyFormData, mapFormDataToPolicy, mapPolicyToFormData } from './policy.mapper';

const mockPolicy: Policy = {
  policyNumber: 1001,
  policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
};

describe('mapPolicyToFormData', () => {
  it('maps policy fields to form data', () => {
    const result = mapPolicyToFormData(mockPolicy);
    expect(result).toEqual({
      policyNumber: 1001,
      policyHolder: { name: 'Alice', age: 30, gender: Gender.Female },
    });
  });
});

describe('mapFormDataToPolicy', () => {
  it('maps form data to policy using provided policyNumber', () => {
    const formData: PolicyFormData = {
      policyNumber: null,
      policyHolder: { name: 'Bob', age: 25, gender: Gender.Male },
    };
    const result = mapFormDataToPolicy(formData, 2002);
    expect(result).toEqual({
      policyNumber: 2002,
      policyHolder: { name: 'Bob', age: 25, gender: Gender.Male },
    });
  });
});

describe('emptyPolicyFormData', () => {
  it('returns form data with null and empty values', () => {
    expect(emptyPolicyFormData()).toEqual({
      policyNumber: null,
      policyHolder: { name: '', age: null, gender: null },
    });
  });
});
