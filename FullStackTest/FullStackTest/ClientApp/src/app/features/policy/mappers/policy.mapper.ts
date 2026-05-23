import { PolicyFormData } from "../models/form-policy.model";
import { Gender } from "../models/gender.model";
import { Policy } from "../models/policy.model";

export function mapPolicyToFormData(formValue: Policy): PolicyFormData {
    return {
        policyNumber: formValue.policyNumber,
        policyHolder: {
            name: formValue.policyHolder.name,
            age: formValue.policyHolder.age,
            gender: formValue.policyHolder.gender
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
