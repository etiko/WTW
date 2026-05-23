import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();

}
