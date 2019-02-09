import { LogWrapper } from './../../logger/log-wrapper';
import { LogService } from './../../logger/log.service';
import { ModalService } from '../../services/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css']
})
export class HelpModalComponent extends LogWrapper implements OnInit, OnDestroy {

  constructor(
    protected logService: LogService,
    private modalService: ModalService
  ) {
    super(logService);
  }

  ngOnInit() { }
  ngOnDestroy() { }

  public handleClose() {
    this.modalService.closeModal()
  }
}
