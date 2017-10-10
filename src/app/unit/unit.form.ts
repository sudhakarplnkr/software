import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { IUnit } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { UnitDataService } from '../unit/unit.data.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'unit-form-view',
  templateUrl: 'unit.form.html'
})

export class UnitFormComponent {
  @Input() unit: IUnit;
  @Output() onSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificationService: NotificationService,
    private unitDataService: UnitDataService) {
  }
  private isModelValid(): boolean {
    if (!this.unit.Code || !this.unit.Description) {
      this.notificationService.printErrorMessage(Constants.MANDATORY_MESSAGE);
      return false;
    }
    return true;
  }
  onSave() {
    if (!this.isModelValid()) {
      return;
    }
    if (this.unit.Id > 0) {
      this.unitDataService.updateUnit(this.unit).subscribe((status: number) => {
        if (status === 412) {
          this.notificationService.printErrorMessage('unit' + Constants.ALREADY_EXIST_MESSAGE);
          return;
        }
        this.notificationService.printSuccessMessage('unit' + Constants.SAVE_SUCCESS_MESSAGE);
        this.onSavedEvent.emit(true);
      },
        error => {
          this.notificationService.printErrorMessage(Constants.SAVE_SUCCESS_MESSAGE + 'unit');
        });
      return;
    }
    this.unitDataService.createUnit(this.unit).subscribe((status: number) => {
      if (status === 412) {
        this.notificationService.printErrorMessage('unit' + Constants.ALREADY_EXIST_MESSAGE);
        return;
      }
      this.notificationService.printSuccessMessage('unit' + Constants.SAVE_SUCCESS_MESSAGE);
      this.onSavedEvent.emit(true);
    },
      error => {
          this.notificationService.printErrorMessage(Constants.SAVE_SUCCESS_MESSAGE + 'unit');
      });
  }
}