import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  readonly title = input('Confirm');
  readonly message = input('Are you sure?');
  readonly confirmLabel = input('Confirm');
  readonly confirmClass = input('btn-danger');

  readonly confirmed = output<void>();

  private readonly modalRef = viewChild<ElementRef>('confirmModal');
  private modalInstance: Modal | null = null;

  show(): void {
    const element = this.modalRef()?.nativeElement;
    if (!element) {
      return;
    }
    this.modalInstance = this.modalInstance ?? new Modal(element);
    this.modalInstance.show();
  }

  hide(): void {
    this.modalInstance?.hide();
  }

  onConfirm(): void {
    this.hide();
    this.confirmed.emit();
  }
}
