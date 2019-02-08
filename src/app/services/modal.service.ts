import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  modal = "help"
  modalChange = new Subject<string>()

  constructor() {
    this.modalChange.subscribe(modal => this.modal = modal);
  }

  public closeModal(): void {
    this.modalChange.next("")
  }
  
  public openModal(modal: string): void {
    this.modalChange.next(modal)
  }
}
