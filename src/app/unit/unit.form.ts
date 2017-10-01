import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { IUnit } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { UnitDataService } from '../unit/unit.data.service';

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

  onSave() {
    if (this.unit.Id > 0) {
      this.unitDataService.updateUnit(this.unit).subscribe(() => {
        this.notificationService.printSuccessMessage('unit saved successful');
        this.onSavedEvent.emit(true);
      },
        error => {
          this.notificationService.printErrorMessage('failed to save unit.');
        });
      return;
    }
    this.unitDataService.createUnit(this.unit).subscribe(() => {
      this.notificationService.printSuccessMessage('unit saved successful');
      this.onSavedEvent.emit(true);
    },
      error => {
        this.notificationService.printErrorMessage('failed to save unit.');
      });
  }
}