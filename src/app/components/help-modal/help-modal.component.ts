import { ModalService } from '../../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css']
})
export class HelpModalComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  handleClose() {
    this.modalService.closeModal()
  }
}
