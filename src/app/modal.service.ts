import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  modal = "help"
  modalChange = new Subject<string>()

  constructor() {
    this.modalChange.subscribe(modal => this.modal = modal)
  }

  closeModal() {
    this.modalChange.next("")
  }
  
  openModal(modal: string) {
    this.modalChange.next(modal)
  }
}
