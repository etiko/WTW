import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultComponent {
  title = input('No items found');
  description = input('There are no items to display.');
}
