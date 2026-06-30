import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrl: './no-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultComponent {
  readonly title = input('No items found');
  readonly description = input('There are no items to display.');
}
