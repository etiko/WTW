import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  title = input('Confirm');
  message = input('Are you sure?');
  confirmLabel = input('Confirm');
  confirmClass = input('btn-danger');

  confirmed = output<void>();

  private modalRef = viewChild<ElementRef>('confirmModal');
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
