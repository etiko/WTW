import { PolicyFormData } from "../models/form-policy.model";
import { Policy } from "../models/policy.model";

export function mapPolicyToFormData(policy: Policy): PolicyFormData {
    return {
        policyNumber: policy.policyNumber,
        policyHolder: {
            name: policy.policyHolder.name,
            age: policy.policyHolder.age,
            gender: policy.policyHolder.gender
        }
    };
}

export function mapFormDataToPolicy(formData: PolicyFormData, policyNumber: number): Policy {
    return {
        policyNumber,
        policyHolder: {
            name: formData.policyHolder.name,
            age: formData.policyHolder.age!,
            gender: formData.policyHolder.gender!
        }
    };
}

export function emptyPolicyFormData(): PolicyFormData {
  return {
    policyNumber: null,
    policyHolder: {
      name: '',
      age: null,
      gender: null
    }
  };
}
