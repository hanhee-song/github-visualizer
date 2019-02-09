import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LogWrapper } from '../logger/log-wrapper';
import { LogService } from '../logger/log.service';

@Injectable()
export class ModalService extends LogWrapper implements OnDestroy {
  modal = "help"
  modalChange = new Subject<string>()

  constructor(
    protected logService: LogService
  ) {
    super(logService);
    this.modalChange.subscribe(modal => this.modal = modal);
  }
  
  ngOnDestroy() { }

  public closeModal(): void {
    this.modalChange.next("")
  }
  
  public openModal(modal: string): void {
    this.modalChange.next(modal)
  }
}
