import { ModalService } from './services/modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modal = "help"
  constructor(
    private modalService: ModalService
  ) {
    this.modalService.modalChange.subscribe(modal => this.modal = modal)
  }
  
  openModal(modal) {
    this.modalService.openModal(modal)
  }
}
