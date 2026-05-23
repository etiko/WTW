import { Gender } from "./gender.model";

export interface PolicyFormData {
  policyNumber: number | null;
  policyHolder: PolicyHolderFormData;
}

export interface PolicyHolderFormData {
  name: string;
  age: number | null;
  gender: Gender | null;
}