import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { IUnit } from '../shared/interfaces';
import { UnitDataService } from '../unit/unit.data.service';
import { NotificationService } from '../utils/notification.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'unit-grid-view',
  templateUrl: 'unit.component.html'
})
export class UnitComponent {
  unitSearchText: string;
  unit: IUnit = {} as IUnit;
  units: IUnit[] = [];
  isAdd: boolean = false;
  isEdit: boolean = false;
  component: any;
  constructor(public http: Http, public configService: ConfigService, public unitDataService: UnitDataService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  AddUnit() {
    this.isAdd = true;
    this.isEdit = false;
    this.unit = {} as IUnit;
  }

  onSavedEvent() {
    this.loadData();
  }

  onEdit(unit: IUnit) {
    this.isEdit = true;
    this.isAdd = false;
    this.unit = Object.assign({}, unit);
  }

  OnCancel() {
    this.isEdit = false;
    this.isAdd = false;
    this.unit = {} as IUnit;
  }

  onDelete(unit: IUnit) {
    let component = this;
    this.notificationService.openConfirmationDialog("Are you sure to delete this unit?", function () {
      component.unitDataService.deleteUnit(unit.Id)
        .subscribe(() => {
          component.loadData();
          component.notificationService.printSuccessMessage('unit'+ Constants.DELETE_SUCCESS_MESSAGE);
        }, function () {
          component.notificationService.printErrorMessage(Constants.DELETE_ERROR_MESSAGE + 'unit');
        });
    });
  }

  loadData() {
    this.isEdit = false;
    this.isAdd = false;
    this.unitDataService.getUnits()
      .subscribe((response) => {
        this.units = response;
      });
  }
}