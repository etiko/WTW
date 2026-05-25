import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { Policy } from '../../models/policy.model';
import { GENDER_OPTIONS } from '../../models/gender.model';

@Component({
  selector: 'app-policy-card',
  templateUrl: './policy-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyCardComponent {
  readonly policy = input.required<Policy>();
  readonly isSelected = input(false);
  readonly selectedItem = output<void>();

  readonly genderLabel = computed(() => {
    const gender = this.policy().policyHolder.gender;
    return GENDER_OPTIONS.find(option => option.value === gender)?.label ?? 'Unknown';
  });
}

